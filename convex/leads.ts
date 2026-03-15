import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getLeads = query({
  args: {},
  handler: async (ctx) => {
    // Only logged in admin can fetch leads
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    const leads = await ctx.db.query("leads").order("desc").collect();
    return leads;
  },
});

export const insertLead = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const leadId = await ctx.db.insert("leads", {
      name: args.name,
      email: args.email,
      message: args.message,
      status: "unread",
    });
    return leadId;
  },
});
