if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("SUPABSE_URL env value is missing!")
if (!process.env.NEXT_PUBLIC_SUPABASE_KEY) throw new Error("SUPABSE_KEY env value is missing!")


export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY