import { z } from "zod";

/**
 * Zod schema for validating environment variables.
 * Enforces Fail Fast principle: if variables are missing, the app crashes at startup.
 */
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  
  // Convex
  NEXT_PUBLIC_CONVEX_URL: z.string().url("Must be a valid Convex URL"),
  
  // Locale
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default("pt"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
});
