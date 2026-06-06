import { z } from "zod";

/**
 * 🧱 DOMAIN LAYER
 * Entidade de Lead (Contato).
 * A fonte de verdade para a estrutura de um Lead.
 */
export const LeadSchema = z.object({
  name: z.string().min(2, "Nome é muito curto").max(100, "Nome é muito longo"),
  email: z.string().email("E-mail inválido"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
  status: z.enum(["unread", "read", "replied", "archived"]).default("unread").optional(),
});

export type LeadEntity = z.infer<typeof LeadSchema>;
