// src/utils/supabase/client.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables:");
  console.error("URL:", supabaseUrl);
  console.error("Key:", supabaseAnonKey);
  throw new Error("❌ Supabase environment variables are missing!");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("✅ Supabase client created");
console.log("NEXT_PUBLIC_SUPABASE_URL =", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY =", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default supabase;
