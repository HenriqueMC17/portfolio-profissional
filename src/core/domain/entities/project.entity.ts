import { z } from "zod";

export const ProjectSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  content: z.string().optional(),
  imageUrl: z.string().url("A URL da imagem é inválida"),
  githubUrl: z.string().url("A URL do GitHub é inválida").optional(),
  liveUrl: z.string().url("A URL de produção é inválida").optional(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  createdAt: z.number().default(() => Date.now()),
});

export type ProjectEntity = z.infer<typeof ProjectSchema>;
