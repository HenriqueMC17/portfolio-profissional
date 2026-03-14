import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Endereço de e-mail inválido"),
  message: z.string().min(10, "Mensagem precisa ter no mínimo 10 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
