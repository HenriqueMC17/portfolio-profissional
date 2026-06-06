import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * 🗄️ INFRASTRUCTURE LAYER
 * Definição do esquema do banco de dados reativo Serverless.
 * Mapeia 1:1 com o Domínio, mas usa a sintaxe de validação otimizada nativa do Convex ('v').
 */

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    content: v.optional(v.string()),
    imageUrl: v.string(),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    featured: v.boolean(),
    createdAt: v.number(),
  }).index("by_featured", ["featured"]),
  
  leads: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    status: v.string(),
    createdAt: v.number(),
  }),
});