/// <reference lib="deno.ns" />
interface InputT {
  applicant_name: string;
  applicant_email: string;
  email_body: string;
  cv_text: string;
  cover_letter_text: string;
  job: {
    title: string;
    description: string;
    requirements: string;
    skills: string;
    type: string;
    remote_type: string;
  };
}
export async function evaluateApplicant(input: InputT) {
  const prompt = `
You are a smart recruiter AI. Given the following:

--- Applicant Info ---
Name: ${input.applicant_name}
Email: ${input.applicant_email}
Email Body: ${input.email_body}

CV:
${input.cv_text}

Cover Letter:
${input.cover_letter_text}

--- Job Info ---
Title: ${input.job.title}
Description: ${input.job.description}
Requirements: ${input.job.requirements}
Skills: ${input.job.skills}
Job Type: ${input.job.type}
Remote Type: ${input.job.remote_type}

--- Task ---
1. Extract the applicant's **timezone** and **location**, look in the email body, cv, cover letter for hints. if not found its null (convert location to country code like 'gb', 'us', 'ie', 'ng').
2. Determine **trust_level**: score 0-100 based on presence of professional markers, look in the email body, cv, cover letter for hints. if not found its null (LinkedIn, GitHub, real name, portfolio links, email pattern).
3. Infer job preferences: preferred **job type** and **remote type**. 'job type' is one from: ["full-time", "part-time", "contract", "internship"], 'remote type" is one from ["remote", "hybrid", "onsite"].
4. Assess **seniority level**: junior, mid-level, or senior.
5. Give a **sentiment** summary of the CV and cover letter by reading their experience and reason for applying and comparing that with the job title, description, requirements, and skills, if not possible return (e.g., 'cv shows the applicant has relevant experience for the job', 'cover letter shows the applicant is knowledgable about the business and is a fast leaner').
6. Compute **match score** from 0-100 based on how well the applicant matches the job description, requirements, and skills.

Return only a JSON like this:
{
  timezone: "GMT+1",
  location: "gb",
  trust_level: 85,
  job_preferences: {
    job_type: "full-time",
    remote_type: "remote"
  },
  seniority_level: "mid-level",
  cv_sentiment: "The applicant has few relevant experience.",
  cover_letter_sentiment: "The applicant is knowledgable about the business.",
  match: 88
}`;
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${Deno.env.get("CLOUDFLARE_ACCOUNT_ID")}/ai/run/@cf/meta/llama-2-7b-chat-int8`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get("CLOUDFLARE_AUTH_TOKEN")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 900
    })
  });
  if (!response.ok) {
    throw new Error(`Cloudflare AI call failed: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  const content = result.result?.response?.trim();
  const regex = /{[\s\S]*?"timezone"\s*:\s*"[^"]+"[\s\S]*?"match"\s*:\s*\d+\s*}/;
  const regex2 = /```([\s\S]*?)```/;
  const match = content.match(regex);
  const match2 = content.match(regex2);
  const output = match ? match[0].trim() : match2 ? match2[1].trim() : `
  {
  timezone: null,
  location: null,
  trust_level: 10,
  job_preferences: {
    job_type: "full-time",
    remote_type: "remote"
  },
  seniority_level: null,
  cv_sentiment: null,
  cover_letter_sentiment: null,
  match: 10
}`;
  try {
    return JSON.parse(output);
  } catch (e) {
    console.error('Failed to parse LLM JSON:', content);
    throw e;
  }
}

