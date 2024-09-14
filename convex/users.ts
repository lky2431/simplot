
import { internalMutation, query, QueryCtx } from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";




export const upsertFromClerk = internalMutation({
    args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
    async handler(ctx, { data }) {
        let id = data.id
        const tutorials = await ctx.db
            .query("tutorial")
            .collect()
        let insertPool = []
        console.log(`tutorial: ${tutorials}`)
        for (let i in tutorials) {
            let tutorial = tutorials[i]
            let project = {
                userId: id,
                updatedAt: Date.now(),
                name: tutorial.name,
                nodes: [...tutorial.nodes],
                edges: [...tutorial.edges],
                importedFiles: [...tutorial.importedFiles]
            }
            insertPool.push(ctx.db.insert("project", project))
        }
        await Promise.all(insertPool)
    },
});

