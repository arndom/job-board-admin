/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2.49.8';
import { Buffer } from 'node:buffer';
import { applyApplicantEvaluations } from './llm-executor.ts';
import { parseStorageText } from "./file-parsers.ts";
import { postmarkOutboundEmail } from "../_shared/send-email-service.ts"
import { storePostmarkEmail } from "../_shared/store-postmark-email-service.ts"
import { confirmationEmailTemplate } from "./confirmation-email-template.ts";
import { InboundWebhook } from 'https://esm.sh/postmark/dist/client/models';

console.info('server started');
Deno.serve(async (req) => {
  const json = await req.json() as InboundWebhook;
  console.info("inbound email processing start");

  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
  const email = json.FromFull.Email;
  const name = json.FromFull.Name || json.FromName || 'Unknown';
  const emailBody = json.TextBody || '';
  console.info("email parsed");

  const toEmail = json.ToFull?.[0]?.Email ?? '';

  // confirm if candidate is applying to a job or is replying admin
  const isReply = toEmail.includes('apply+');
  const isReplyAlt = json.Headers?.some(h => h.Name === 'In-Reply-To');

  // check for and handle email communication
  if (isReply || isReplyAlt) {
    const { data: applicantData, error: applicantError } = await supabase.from('applicants').select('id').eq('email', email).single();
    if (applicantError || !applicantData?.id) {
      console.error('Applicant not found:', applicantError);
      return new Response('Applicant not found', {
        status: 400
      });
    }

    const jobEmail = toEmail.replace("apply+", "");
    const { data: jobData, error: jobError } = await supabase.from('jobs').select('id').eq('email', jobEmail).single();
    if (jobError || !jobData?.id) {
      console.error('Applicant not found:', jobError);
      return new Response('Applicant not found', {
        status: 400
      });
    }

    const { data: applicationData, error: applicationError } = await supabase.from('applications').select('id').eq('applicant_id', applicantData.id).eq('job_id', jobData.id).single();
    if (applicationError || !applicationData?.id) {
      console.error('Application not found:', applicationError);
      return new Response('Application not found', {
        status: 400
      });
    }

    await storePostmarkEmail({
      supabase,
      application_id: applicationData.id,
      sender_type: 'applicant',
      direction: 'inbound',
      subject: json.Subject,
      body: json.TextBody,
      sent_at: new Date(json.Date),
      message_id: json.MessageID,
      in_reply_to: json.Headers.find((v) => v.Name === "In-Reply-To")?.Value ?? null
    });
    console.info("candidate email reference saved");

    return new Response('Skipping application flow — this is a reply.', { status: 200 });
  }

  const { data: job, error: jobError } = await supabase.from('jobs').select('*').eq('email', toEmail).single();
  if (jobError || !job?.id) {
    console.error('Job not found:', jobError);
    return new Response('Job not found', {
      status: 400
    });
  }
  console.info("related job found");

  const { data: applicant, error: applicantError } = await supabase.from('applicants').upsert({
    email,
    name
  }, {
    onConflict: 'email'
  }).select().single();

  if (!applicant || applicantError) {
    console.error('Failed to create/find applicant', applicant, applicantError);
    return new Response(JSON.stringify({
      error: 'Applicant creation failed'
    }), {
      status: 500
    });
  }
  console.info("candidate created/updated");

  const applicantId = applicant.id;

  // store inbound email
  await storePostmarkEmail({
    supabase,
    application_id: applicantId,
    sender_type: 'applicant',
    direction: 'inbound',
    subject: json.Subject,
    body: json.TextBody,
    sent_at: new Date(json.Date),
    message_id: json.MessageID,
    in_reply_to: json.Headers.find((v) => v.Name === "In-Reply-To")?.Value ?? null
  });
  console.info("candidate incoming email reference saved");

  // process attachments
  const attachments = json.Attachments || [];
  let hasCv = false;
  let hasCoverLetter = false;
  let parsedCVText = "";
  let coverLetterText = "";

  for (const file of attachments) {
    const filename = file.Name.toLowerCase();
    const isCv = filename.includes('cv') || filename.includes('resume') || filename.endsWith('.pdf');
    const isLetter = filename.includes('cover') || filename.includes('letter');
    await supabase.storage.from('applicants-files').upload(`${applicantId}/${filename}`, Buffer.from(file.Content, 'base64'), {
      contentType: file.ContentType
    });
    const { data: urlData } = await supabase.storage.from('applicants-files').createSignedUrl(`${applicantId}/${filename}`, 3600 * 730); // 1 month expiry
    console.info("attachment stored");

    if (isCv) {
      hasCv = true;
      if (urlData) {
        const url = urlData.signedUrl;
        await supabase.from('applicants').update({
          cv_url: url
        }).eq('id', applicantId);
        parsedCVText = await parseStorageText({
          bucket: 'applicants-files',
          path: `${applicantId}/${filename}`,
          supabase
        });
      }
    }

    if (isLetter) {
      hasCoverLetter = true;
      if (urlData) {
        const url = urlData.signedUrl;
        await supabase.from('applicants').update({
          cover_letter_url: url
        }).eq('id', applicantId);
        coverLetterText = await parseStorageText({
          bucket: 'applicants-files',
          path: `${applicantId}/${filename}`,
          supabase
        });
      }
    }
  }

  // create application
  const { data: application, error: applicationError } = await supabase.from('applications').insert([
    {
      applicant_id: applicantId,
      job_id: job.id,
      has_cv: hasCv,
      has_cover_letter: hasCoverLetter,
      status: 'callback',
      cover_letter_sentiment: null,
      cv_sentiment: null
    }
  ]).select();
  console.info("application created");

  if (applicantError) {
    console.error('Failed to create application', applicationError);
    return new Response(JSON.stringify({
      error: 'Applicaton creation failed'
    }), {
      status: 500
    });
  }

  // evaluate candidate info with llm
  await applyApplicantEvaluations({
    supabase,
    applicantId,
    name,
    email,
    emailBody,
    parsedCVText,
    coverLetterText,
    job
  });
  console.info("applicant evaluated");

  // send confirmation to candidate
  const subject = `Application for ${job.title} successfully received`;
  const confirmationBody = confirmationEmailTemplate(applicant.name, applicant.email, job.company_name, job.title);
  await postmarkOutboundEmail({
    to: applicant.email,
    subject,
    body: confirmationBody,
    from: `apply+${job.email}`
  })
  console.info("confirmation email sent");

  if (application) {
    // store outbound email
    await storePostmarkEmail({
      supabase,
      application_id: application[0].id,
      sender_type: 'admin',
      direction: 'outbound',
      subject: subject,
      body: confirmationBody,
      message_id: json.MessageID,
    });
    console.info("candidate outgoing email reference saved");
  }

  console.info("inbound email processing done");
  return new Response(JSON.stringify({
    status: 'ok'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    }
  });
});
