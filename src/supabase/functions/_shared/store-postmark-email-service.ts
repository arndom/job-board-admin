/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseClient } from "jsr:@supabase/supabase-js@2.49.8";

interface InputT {
  // deno-lint-ignore no-explicit-any
  supabase: SupabaseClient<any, "public", any>;
  application_id: string;
  sender_type: string;
  direction: string;
  subject: string;
  body: string;
  sent_at?: Date;
  message_id: string;
  in_reply_to?: string | null;
}

export const storePostmarkEmail = async (input: InputT) => {
  const {supabase, ...payload} = input;

  await supabase.from('emails').insert(payload);
}