import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  project: defineTable({
    userId: v.id("users"),
    userEmail: v.string(),
    name: v.string(),
    website: v.string(),
  })
    // https://docs.convex.dev/database/indexes/indexes-and-query-perf
    .index("creator", ["userEmail"])
    .searchIndex("search_body", {
      // https://docs.convex.dev/search/text-search
      searchField: "name",
    }),
  feedback: defineTable({
    projectId: v.id("project"),
    by: v.string(),
    content: v.string(),
    type: v.string(),
    location: v.string(),
    country_code: v.string(),
    route: v.string(),
    status: v.string(), // resolved or pending
  })
    .index("projectId", ["projectId"])
    .index("status", ["status"]),
});

export default schema;
