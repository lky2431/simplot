import { query, mutation, internalMutation, action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Return the last 100 tasks in a given task list.
export const tutorial = query({

    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        const id: string = identity.tokenIdentifier
        const tasks = await ctx.db
            .query("tutorial").collect();
        return tasks;
    },
});

export const user_project = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        const id: string = identity.subject

        const projects = await ctx.db.query("project")
            .withIndex("by_user", (q) => q.eq("userId", id))
            .collect()
        return projects;
    }
})

export const create_project = mutation({
    args: {
        name: v.string(),
        nodes: v.array(v.any()),
        edges: v.array(v.any()),
        importedFiles: v.array(v.object({
            name: v.string(),
            data: v.array(v.any())
        }))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        const id: string = identity.subject
        const project = await ctx.db.insert("project", {
            nodes: args.nodes,
            edges: args.edges,
            userId: id,
            updatedAt: Date.now(),
            name: args.name,
            importedFiles: args.importedFiles,
            public: false
        })
        return project
    }
})

export const save_project = mutation({
    args: {
        id: v.id("project"),
        name: v.string(),
        nodes: v.array(v.any()),
        edges: v.array(v.any()),
        pub: v.boolean(),
        importedFiles: v.array(v.object({
            name: v.string(),
            data: v.array(v.any())
        }))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        const id: string = identity.subject
        const project = await ctx.db.patch(args.id, {
            nodes: args.nodes,
            edges: args.edges,
            updatedAt: Date.now(),
            name: args.name,
            importedFiles: args.importedFiles,
            public: args.pub
        })
    }
})

export const remove_project = mutation({
    args: { id: v.id("project") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    }
})



export const get_project = query({
    args: { projectId: v.id("project") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        const project = await ctx.db.get(args.projectId)
        if (project != null) {
            if (project.public || project.userId == identity.subject) {
                return {
                    project: project,
                    owned: project.userId == identity.subject
                }
            }
            throw new Error("Project cannot be found");
        }
        return null

    }
})