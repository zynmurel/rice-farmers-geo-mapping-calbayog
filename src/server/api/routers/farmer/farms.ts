import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";

export const farmerFarmsRouter = createTRPCRouter({
  getFarms: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.farm.findMany({
      where: {
        Farmer: {
          accountId: ctx.session.user.id,
        },
      },
      include: {
        FarmImage: true,
        Distribution: {
          include: {
            CropDistribution: true,
            FertilizerDistribution: true,
            Planting: true,
          },
        },
      },
    });
  }),
});
