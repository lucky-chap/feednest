import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { checkUserId } from "./helpers";

export const searchProjects = query({
  args: {
    searchTerm: v.string(),
    paginationOpts: paginationOptsValidator,
    userId: v.any(),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const searchResults = await ctx.db
      .query("projects")
      .withSearchIndex("search_body", (q) => q.search("name", args.searchTerm))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .paginate(args.paginationOpts);

    return searchResults;
  },
});

export const fetchProjects = query({
  args: {
    paginationOpts: paginationOptsValidator,
    userId: v.any(),
    user_email: v.any(),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const projects = await ctx.db
      .query("projects")
      .withIndex("creator", (q) => q.eq("userEmail", args.user_email))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .paginate(args.paginationOpts);

    return projects;
  },
});

// fetch single project by id
export const fetchSingleProject = query({
  args: {
    id: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const project = await ctx.db.get(id);
    return project;
  },
});

// Create a new project
export const createProject = mutation({
  args: {
    name: v.string(),
    website: v.string(),
    userEmail: v.string(),
  },
  handler: async (ctx, { name, website, userEmail }) => {
    const userId = await checkUserId(ctx);
    const projectId = await ctx.db.insert("projects", {
      userId,
      userEmail,
      name,
      website,
      summary: "",
    });

    return projectId;
  },
});

// Update an project
export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
    website: v.string(),
    summary: v.string(),
    suggestions: v.string(),
  },
  handler: async (ctx, { projectId, name, website, summary, suggestions }) => {
    await checkUserId(ctx);
    await ctx.db.patch(projectId, {
      name,
      website,
      summary,
      suggestions,
    });
    return "updated";
  },
});

// Delete a project & all of its feedback
export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const deletedProject = await ctx.db.delete(args.projectId);
    if (deletedProject !== null) {
      const feedbacks = await ctx.db
        .query("feedback")
        .filter((q) => q.eq(q.field("projectId"), args.projectId))
        .collect();
      if (feedbacks !== null) {
        feedbacks.map(async (feedback) => {
          await ctx.db.delete(feedback._id);
        });
        return "deleted";
      }
      return "deleted";
    } else {
      return null;
    }
  },
});
