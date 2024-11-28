import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { internal } from "./_generated/api";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { checkUserId } from "./helpers";

// I could nest feedback in the project object
// but I want to keep the project object clean
// and avoid unnecessary performance issues.
// Even Convex advices so over here:
// https://docs.convex.dev/database/document-ids#trading-off-deeply-nested-documents-vs-relationships

export const fetchFeedbackForProject = query({
  args: {
    paginationOpts: paginationOptsValidator,
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const { projectId } = args;
    const feedback = await ctx.db
      .query("feedback")
      .withIndex("projectId", (q) => q.eq("projectId", projectId))
      .filter((q) => q.eq(q.field("projectId"), projectId))
      .order("desc")
      .paginate(args.paginationOpts);

    return feedback;
  },
});

export const getFeedbackLength = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const { projectId } = args;
    const feedback = await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("projectId"), projectId))
      .order("desc")
      .collect();

    return feedback.length;
  },
});

// fetch single feedback by id
export const fetchSingleFeedback = query({
  args: {
    id: v.optional(v.id("feedback")),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const feedback = await ctx.db.get(id);
    return feedback;
  },
});

// Create new feedback for project
export const createFeedbackForProject = mutation({
  args: {
    projectId: v.id("projects"),
    by: v.string(),
    content: v.string(),
    location: v.string(),
    country_code: v.string(),
    type: v.string(),
    route: v.string(),
    status: v.string(),
    sentiment: v.string(),
  },
  handler: async (
    ctx,
    {
      projectId,
      by,
      content,
      location,
      country_code,
      type,
      route,
      status,
      sentiment,
    },
  ) => {
    const feedbackId = await ctx.db.insert("feedback", {
      projectId,
      by,
      content,
      location,
      country_code,
      type,
      route,
      status,
      sentiment,
    });

    return feedbackId;
  },
});

// update feedback status

export const updateFeedbackStatus = mutation({
  args: {
    feedbackId: v.id("feedback"),
    feedbackStatus: v.string(),
  },
  handler: async (ctx, { feedbackId, feedbackStatus }) => {
    await checkUserId(ctx);
    await ctx.db.patch(feedbackId, {
      status: feedbackStatus,
    });
    return "feedback_status_updated";
  },
});

export const deleteFeedback = internalMutation({
  args: {
    feedbackId: v.id("feedback"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const deletedFeedback = await ctx.db.delete(args.feedbackId);
    if (deletedFeedback !== null) {
      return "deleted";
    } else {
      return null;
    }
  },
});
