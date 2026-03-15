import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  projects: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    content: v.optional(v.string()),
    tech_stack: v.optional(v.array(v.string())),
    image_url: v.optional(v.string()),
    live_url: v.optional(v.string()),
    github_url: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    order_index: v.optional(v.number()),
  }).index("by_slug", ["slug"]).index("by_order", ["order_index"]),

  experiences: defineTable({
    role: v.string(),
    company: v.string(),
    start_date: v.string(),
    end_date: v.optional(v.string()),
    current: v.optional(v.boolean()),
    description: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    order_index: v.optional(v.number()),
  }).index("by_order", ["order_index"]),

  leads: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    status: v.optional(v.union(
      v.literal("unread"),
      v.literal("read"),
      v.literal("replied")
    )),
  }).index("by_status", ["status"]),
});
