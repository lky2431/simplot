import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    project: defineTable({
        userId: v.string(),
        updatedAt: v.number(),
        name: v.string(),
        nodes: v.array(v.any()),
        edges: v.array(v.any()),
        public: v.boolean(),
        importedFiles: v.array(v.object({
            name: v.string(),
            data: v.array(v.any())
        }))
    }).index("by_user", ["userId"]),
    tutorial: defineTable({
        nodes: v.array(v.any()),
        edges: v.array(v.any()),
        name: v.string(),
        importedFiles: v.array(v.object({
            name: v.string(),
            data: v.array(v.any())
        }))
    })

});