import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const weatherRiskRouter = createTRPCRouter({
  getWeatherRisks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.weatherRisk.findMany();
  }),
});
