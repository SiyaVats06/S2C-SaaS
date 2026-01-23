import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
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
export const createProject = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    sketchesData: v.any(),
    thumbnail: v.optional(v.string()),
  },
  handler: async (ctx, { userId, name, sketchesData, thumbnail }) => {
    console.log("Convext creating project for users", userId);

    const projectNumber = await getNextProjectNumber(ctx, userId);
    const projectName = name || `Project${projectNumber}`;

    const projectId = await ctx.db.insert("projects", {
      userId,
      name: projectName,
      sketchesData,
      thumbnail,
      projectNumber,
      lastModified: Date.now(),
      createdAt: Date.now(),
      isPublic: false,
    });
    return {
      projectId,
      name: projectName,
      projectNumber,
    };
  },
});
const getNextProjectNumber = async (
  ctx: any,
  userId: string
): Promise<number> => {
  // Get or create project counter for this user
  const counter = await ctx.db
    .query("project_counters")
    .withIndex("by_userId", (q: any) => q.eq("userId", userId))
    .first(); // .first() returns the first matching document, or null if no document exists

  if (!counter) {
    // Create new counter starting at 1
    await ctx.db.insert("project_counters", {
      userId,
      nextProjectNumber: 2, //Next will be 2
    });
    return 1;
  }

  const projectNumber = counter.nextProjectNumber;

  // Increment counter for next time
  // This is Convex’s way to partially update an existing document.
  await ctx.db.patch(counter._id, {
    nextProjectNumber: projectNumber + 1,
  });

  return projectNumber;
};

export const getUserProjects = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { userId, limit = 20 }) => {
    const allProjects = await ctx.db
      .query("projects")
      .withIndex("by_userId_lastModified", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    const projects = allProjects.slice(0, limit);
    return projects.map((project) => ({
      _id: project._id,
      name: project.name,
      projectNumber: project.projectNumber,
      thumbnail: project.thumbnail,
      lastModified: project.lastModified,
      createdAt: project.createdAt,
      isPublic: project.isPublic,
    }));
  },
});

export const getProjectStyleGuide = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not Authenticated");

    const project = await ctx.db.get(projectId);
    if (!project) throw new Error("Project not found!");

    if (project.userId !== userId && !project.isPublic) {
      throw new Error("Access Denied");
    }

    return project.styleGuide ? JSON.parse(project.styleGuide) : null;
  },
});
