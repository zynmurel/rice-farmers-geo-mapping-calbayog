import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";

export const farmRouter = createTRPCRouter({
  getFarm: protectedProcedure
    .input(
      z.object({
        farmingMethodIds: z.number().array(),
        weatherRiskIds: z.number().array(),
        farmStatus: z.enum(["All", "Featured", "Published"]),
        barangay: z.string(),
        skip: z.number(),
        take: z.number(),
      }),
    )
    .query(
      async ({
        ctx,
        input: {
          skip,
          take,
          barangay,
          farmingMethodIds,
          weatherRiskIds,
          farmStatus,
        },
      }) => {
        const whereBarangay = barangay === "All" ? {} : { barangay };
        const whereFarmingMethod = farmingMethodIds.length
          ? {
              FarmFarmingMethod: {
                some: { farmingMethodId: { in: farmingMethodIds } },
              },
            }
          : {};
        const whereWeatherRisk = weatherRiskIds.length
          ? {
              FarmWeatherRisk: {
                some: { weatherRiskId: { in: weatherRiskIds } },
              },
            }
          : {};
        const whereFarmStatus =
          farmStatus === "Featured"
            ? { isFeatured: true }
            : farmStatus === "Published"
              ? { isPublished: true }
              : {};
        return await ctx.db.farm.findMany({
          where: {
            ...whereFarmStatus,
            ...whereBarangay,
            ...whereFarmingMethod,
            ...whereWeatherRisk,
          },
          skip,
          take,
          include: {
            Farmer: true,
            FarmFarmingMethod: {
              include: {
                FarmingMethod: true,
              },
            },
            FarmWeatherRisk: {
              include: {
                WeatherRisk: true,
              },
            },
          },
        });
      },
    ),
  getFarmCount: protectedProcedure
    .input(
      z.object({
        farmingMethodIds: z.number().array(),
        weatherRiskIds: z.number().array(),
        barangay: z.string(),
        farmStatus: z.enum(["All", "Featured", "Published"]),
      }),
    )
    .query(
      async ({
        ctx,
        input: { barangay, farmingMethodIds, weatherRiskIds, farmStatus },
      }) => {
        const whereBarangay = barangay === "All" ? {} : { barangay };
        const whereFarmingMethod = farmingMethodIds.length
          ? {
              FarmFarmingMethod: {
                some: { farmingMethodId: { in: farmingMethodIds } },
              },
            }
          : {};
        const whereWeatherRisk = weatherRiskIds.length
          ? {
              FarmWeatherRisk: {
                some: { weatherRiskId: { in: weatherRiskIds } },
              },
            }
          : {};
        const whereFarmStatus =
          farmStatus === "Featured"
            ? { isFeatured: true }
            : farmStatus === "Published"
              ? { isPublished: true }
              : {};
        return await ctx.db.farm.count({
          where: {
            ...whereFarmStatus,
            ...whereBarangay,
            ...whereFarmingMethod,
            ...whereWeatherRisk,
          },
        });
      },
    ),
  updateFarmIsFeatured: protectedProcedure
    .input(
      z.object({
        isFeatured: z.boolean(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      return ctx.db.farm.update({
        where: { id },
        data: rest,
      });
    }),
});
