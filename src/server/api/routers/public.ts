import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const publicRouter = createTRPCRouter({
  getFeaturedFarms: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.farm.findMany({
      where: {
        isFeatured: true,
        isPublished: true,
      },
      include: {
        Farmer: true,
        FarmImage: true,
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
  }),
  getPublishedFarm: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.farm
      .findMany({
        where: {
          isPublished: true,
        },
      })
      .then((data) =>
        data.filter((d) => {
          const coordinates = d.coordinates as { lng: number; lat: number }[];
          return coordinates.length;
        }),
      );
  }),
  getRegisteredFarmCount: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.farm.count();
  }),
});
