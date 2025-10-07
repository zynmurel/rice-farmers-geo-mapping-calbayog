import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const overviewRouter = createTRPCRouter({
  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Group planting data by distribution
      const plantingGroups = await ctx.db.planting.groupBy({
        by: ["distributionId"],
        _sum: {
          plantedQuantity: true,
          harvestedQuantity: true,
          plantedArea: true,
        },
      });

      const distributions = await ctx.db.distribution.findMany({
        select: {
          id: true,
          year: true,
          season: true,
        },
      });

      // Map data per year-season
      const dataMap: Record<
        string,
        {
          year: string;
          season: string;
          planted: number;
          harvested: number;
          area: number;
        }
      > = {};

      plantingGroups.forEach((p) => {
        const dist = distributions.find((d) => d.id === p.distributionId);
        if (!dist) return;

        const key = `${dist.year}-${dist.season}`;
        if (!dataMap[key]) {
          dataMap[key] = {
            year: dist.year,
            season: dist.season,
            planted: 0,
            harvested: 0,
            area: 0,
          };
        }

        dataMap[key].planted += p._sum.plantedQuantity || 0;
        dataMap[key].harvested += p._sum.harvestedQuantity || 0;
        dataMap[key].area += p._sum.plantedArea || 0;
      });

      const results = Object.values(dataMap).map((d) => ({
        ...d,
        plantedTonnes: d.planted / 1000,
        harvestedTonnes: d.harvested / 1000,
        yieldRate: d.planted ? (d.harvested / d.planted) * 100 : 0,
      }));

      return results;
    } catch (error) {
      console.error("Dashboard stats error:", error);
      throw new Error("Failed to load dashboard stats");
    }
  }),
    getDashboardStatsByYear: protectedProcedure
    .input(
      z
        .object({
          year: z.string().optional(),
          season: z.enum(["WET", "DRY", "BOTH"]).optional().default("BOTH"),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const { year, season } = input ?? { year: undefined, season: "BOTH" };

      const filters: any = {};
      if (year) filters.year = year;
      if (season && season !== "BOTH") filters.season = season;

      const distributions = await ctx.db.distribution.findMany({
        where: filters,
        select: { id: true, year: true, season: true },
      });

      if (distributions.length === 0) return [];

      const distributionIds = distributions.map((d) => d.id);

      const plantingGroups = await ctx.db.planting.groupBy({
        by: ["distributionId"],
        _sum: {
          plantedQuantity: true,
          harvestedQuantity: true,
          plantedArea: true,
        },
        where: {
          distributionId: { in: distributionIds },
        },
      });

      const dataMap: Record<
        string,
        {
          year: string;
          season: string;
          planted: number;
          harvested: number;
          area: number;
        }
      > = {};

      plantingGroups.forEach((p) => {
        const dist = distributions.find((d) => d.id === p.distributionId);
        if (!dist) return;

        const key = `${dist.year}-${dist.season}`;
        if (!dataMap[key]) {
          dataMap[key] = {
            year: dist.year,
            season: dist.season,
            planted: 0,
            harvested: 0,
            area: 0,
          };
        }

        dataMap[key].planted += p._sum.plantedQuantity || 0;
        dataMap[key].harvested += p._sum.harvestedQuantity || 0;
        dataMap[key].area += p._sum.plantedArea || 0;
      });

      const results = Object.values(dataMap).map((d) => ({
        ...d,
        plantedTonnes: d.planted / 1000,
        harvestedTonnes: d.harvested / 1000,
        yieldRate: d.planted ? (d.harvested / d.planted) * 100 : 0,
      }));

      return results;
    }),
});
