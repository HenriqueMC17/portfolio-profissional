import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * 🗄️ INFRASTRUCTURE LAYER
 * Queries públicas para buscar os dados de Projetos com otimização via índices.
 */

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(6);
  },
});

/**
 * ✍️ MUTATION: Criação de um novo projeto.
 * O esquema de validação aqui garante que o banco de dados
 * nunca receba um payload que quebre a tipagem do nosso Domínio (Zod).
 */
export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    content: v.optional(v.string()),
    imageUrl: v.string(),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      ...args,
      createdAt: Date.now(), // Gerado estritamente no servidor
    });
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").order("desc").collect();
  },
});