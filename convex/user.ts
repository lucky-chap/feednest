// THIS IS NOT THE ACTUAL USER MODEL
// THIS IS USED FOR ACCESSING PARTS OF THE
// ORIGINAL USER MODEL/TABLE CREATED BY THE AUTH PROVIDER
import { v } from "convex/values";

import { query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    // TODO: update to current API
    const userId = await auth.getUserId(ctx);
    return userId !== null ? ctx.db.get(userId) : null;
  },
});
