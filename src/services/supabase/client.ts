import { createClient } from "@supabase/supabase-js";

// Garantir fallback vazio se variáveis de ambiente não estiverem disponíveis durante build isolada
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
