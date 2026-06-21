import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * 🛠️ DEBUGLING/RESET MUTATION
 * Permite limpar a conta admin@example.com para que o primeiro acesso (autenticação com fallback de auto-registro) possa ser refeito.
 */
export const resetAdminAccount = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Procurar na tabela de contas (authAccounts) pelo provedor "password" e ID da conta "admin@example.com"
    const accounts = await ctx.db
      .query("authAccounts")
      .collect();
    
    let deletedAccountsCount = 0;
    let deletedUsersCount = 0;

    for (const account of accounts) {
      if (account.providerAccountId === "admin@example.com") {
        // Deleta a conta de autenticação
        await ctx.db.delete(account._id);
        deletedAccountsCount++;

        // Deleta o usuário correspondente
        if (account.userId) {
          const user = await ctx.db.get(account.userId);
          if (user) {
            await ctx.db.delete(user._id);
            deletedUsersCount++;
          }
        }
      }
    }

    // 2. Fallback: procurar diretamente na tabela de usuários por email se sobrou algo
    const users = await ctx.db.query("users").collect();
    for (const user of users) {
      if ((user as any).email === "admin@example.com") {
        await ctx.db.delete(user._id);
        deletedUsersCount++;
      }
    }

    return {
      success: true,
      message: `Reset finalizado: ${deletedAccountsCount} conta(s) e ${deletedUsersCount} usuário(s) removidos.`,
    };
  },
});
