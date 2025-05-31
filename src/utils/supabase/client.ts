import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_KEY, SUPABASE_URL } from "./constants";
import { Database } from "./database.types";

export const supabaseBrowserClient = createBrowserClient<Database>(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    db: {
      schema: "public",
    },
  }
);
