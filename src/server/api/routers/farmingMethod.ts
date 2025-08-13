import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const farmingMethodRouter = createTRPCRouter({
  getFarmingMethods: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.farmingMethod.findMany();
  }),
});
