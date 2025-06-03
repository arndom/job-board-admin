/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { evaluateApplicant } from './llm.ts';
import { SupabaseClient } from "jsr:@supabase/supabase-js@2.49.8";

interface InputT {
  // deno-lint-ignore no-explicit-any
  supabase: SupabaseClient<any, "public", any>;
  applicantId: string;
  name: string;
  email: string;
  emailBody: string;
  parsedCVText: string
  coverLetterText: string
  // deno-lint-ignore no-explicit-any
  job: any;
}

/**
 *
 * Update applicant and application fields with evaluations from llm.
 */
export async function applyApplicantEvaluations(input: InputT) {
const { applicantId, emailBody, email, job, name, parsedCVText, coverLetterText, supabase } = input;
  try {
    const enrichment = await evaluateApplicant({
      applicant_name: name,
      applicant_email: email,
      email_body: emailBody,
      cv_text: parsedCVText,
      cover_letter_text: coverLetterText || emailBody,
      job: {
        title: job.title,
        description: job.description,
        requirements: job.requirements,
        skills: job.skills,
        type: job.job_type,
        remote_type: job.remote_type
      }
    });
    // Update applicant
    await supabase.from('applicants').update({
      timezone: enrichment.timezone,
      location: enrichment.location,
      trust_level: enrichment.trust_level,
      job_preferences: enrichment.job_preferences
    }).eq('id', applicantId);
    // Update application
    await supabase.from('applications').update({
      match: enrichment.match,
      seniority_level: enrichment.seniority_level,
      cv_sentiment: enrichment.cv_sentiment,
      cover_letter_sentiment: enrichment.cover_letter_sentiment
    }).eq('applicant_id', applicantId).eq('job_id', job.id);
  } catch (err) {
    console.error('Failed to enrich applicant:', err);
  }
}

