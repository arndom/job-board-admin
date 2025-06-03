/// <reference lib="deno.ns" />

interface inputT {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
  from: string;
}

export const postmarkOutboundEmail = async (input: inputT) => {
  const { to, subject, body, replyTo, from } = input;
  const postmarkToken = Deno.env.get("POSTMARK_API_KEY");
  const payload = {
    From: from,
    To: to,
    Subject: subject,
    HtmlBody: body,
    MessageStream: "outbound",
    ...replyTo ? {
      ReplyTo: replyTo
    } : {}
  };

  return await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "X-Postmark-Server-Token": postmarkToken ?? '',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}