import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * ✍️ MUTATION: Inserção segura de mensagens no banco.
 * O Convex valida os tipos via 'v', garantindo proteção na borda do servidor.
 */
export const send = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // Timestamp confiável gerado no servidor
    return await ctx.db.insert("messages", { ...args, createdAt: Date.now() });
  },
});