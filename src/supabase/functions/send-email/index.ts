/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { postmarkOutboundEmail } from "../_shared/send-email-service.ts"
import { storePostmarkEmail } from "../_shared/store-postmark-email-service.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2.49.8';

console.info('server started');
Deno.serve(async (req) => {
  const { to, subject, body, replyTo, from } = await req.json();
  const res = await postmarkOutboundEmail({ to, subject, body, replyTo, from });
  const data = await res.json();
  if (!res.ok || !data.MessageID) {
    console.error("Postmark error:", data);
    return new Response('Failed to send email via Postmark', {
      status: 400
    });
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');

  const { data: applicantData, error: applicantError } = await supabase.from('applicants').select('id').eq('email', to).single();
  if (applicantError || !applicantData?.id) {
    console.error('Applicant not found:', applicantError);
    return new Response('Applicant not found', {
      status: 400
    });
  }

  const jobEmail = from.replace("apply+", "");
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

  // store outbound email
  await storePostmarkEmail({
    supabase,
    application_id: applicationData.id,
    sender_type: 'admin',
    direction: 'outbound',
    subject: subject,
    body: body,
    message_id: data.MessageID,
  });
  console.info("candidate outgoing email reference saved");


  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    }
  });
});
