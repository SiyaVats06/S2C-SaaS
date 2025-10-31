import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) throw new Error("Not Authenticated");

    const project = await ctx.db.get(projectId);

    if (!project) throw new Error("Project Not Found");

    if (project.userId !== userId && !project.isPublic) {
      throw new Error("Access Denied");
    }

    return project;
  },
});
