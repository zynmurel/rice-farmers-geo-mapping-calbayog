import {
  addFarmImageSchema,
  createFarmerMutationSchema,
  updateFarmerSchema,
  updateFarmSchema,
} from "@/lib/schemas/create-farmer";
import { formatCoordinatesToJSON } from "@/lib/utils";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { Farmer } from "@prisma/client";
import z from "zod";

export const farmerRouter = createTRPCRouter({
  getFarmers: protectedProcedure
    .input(
      z.object({
        search: z.string(),
        skip: z.number(),
        take: z.number(),
      }),
    )
    .query(async ({ ctx, input: { search, skip, take } }) => {
      const farmers = await ctx.db.$queryRaw`
      SELECT *
      FROM "Farmer"
      WHERE 
        LOWER(CONCAT("firstName", ' ', "lastName")) LIKE LOWER(${`%${search}%`})
        OR "phoneNumber" ILIKE ${`%${search}%`}
        ORDER BY "createdAt" DESC
        OFFSET ${skip}
        LIMIT ${take}
    `;
      return farmers as Farmer[];
    }),
  getFarmersCount: protectedProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .query(async ({ ctx, input: { search } }) => {
      const result = await ctx.db.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*)::bigint AS count
        FROM "Farmer"
        WHERE 
          LOWER(CONCAT("firstName", ' ', "lastName")) LIKE LOWER(${`%${search}%`})
          OR "phoneNumber" ILIKE ${`%${search}%`}
      `;

      return Number(result[0]?.count || 0);
    }),
  getFarmer: protectedProcedure
    .input(
      z.object({
        farmerId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const farmer = await ctx.db.farmer.findUnique({
        where: { id: input.farmerId },
        include: {
          FarmerAccount: true,
        },
      });
      if (!farmer) throw new Error("No farmer found");
      return farmer;
    }),
  getFarmerByAccountId: protectedProcedure
    .input(
      z.object({
        farmerId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const farmer = await ctx.db.farmer.findFirst({
        where: {
          accountId: input.farmerId,
        },
        include: {
          FarmerAccount: true,
        },
      });
      if (!farmer) throw new Error("No farmer found");
      return farmer;
    }),
  getFarmerFarms: protectedProcedure
    .input(
      z.object({
        farmerId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const farms = await ctx.db.farm.findMany({
        where: { farmerId: input.farmerId },
        include: {
          FarmImage: true,
        },
      });
      return farms;
    }),
  getFarmerFarm: protectedProcedure
    .input(
      z.object({
        farmId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const farms = await ctx.db.farm.findUnique({
        where: { id: input.farmId },
        include: {
          Farmer: true,
          FarmImage: true,
        },
      });
      return farms;
    }),
  createFarmerAndFarms: protectedProcedure
    .input(createFarmerMutationSchema)
    .mutation(async ({ ctx, input }) => {
      const { farms, ...rest } = input;
      return ctx.db.$transaction(async (tx) => {
        const farmerData = await tx.farmer.create({
          data: { ...rest },
        });
        const farmsData = await Promise.all(
          farms.map(async (farm) => {
            const { images, coordinates, ...rest } = farm;
            const coordinatesToJson = formatCoordinatesToJSON(coordinates);
            return await tx.farm.create({
              data: {
                farmerId: farmerData.id,
                ...rest,
                coordinates: coordinatesToJson || [],
                FarmImage: {
                  createMany: {
                    data: images.map((imgUrl, index) => ({
                      caption: `Image ${index + 1}`,
                      order: index,
                      url: imgUrl,
                    })),
                  },
                },
              },
            });
          }),
        );

        await tx.activityLog.create({
          data: {
            farmerId: farmerData.id,
            type: "FARMER",
            action: "CREATE",
            message: `Created farmer ${farmerData.firstName} ${farmerData.lastName}`,
          },
        });

        await Promise.all(
          farmsData.map((fd) => {
            tx.activityLog.create({
              data: {
                farmerId: fd.id,
                type: "FARM",
                action: "UPDATE",
                message: `Created a farm for ${farmerData.firstName} ${farmerData.lastName}`,
              },
            });
          }),
        );

        return {
          farmer: farmerData,
          farms: farmsData,
        };
      });
    }),
  updateFarmer: protectedProcedure
    .input(updateFarmerSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      const farmer = await ctx.db.farmer.update({
        where: { id },
        data: rest,
      });

      await ctx.db.activityLog.create({
        data: {
          farmerId: farmer.id,
          type: "FARMER",
          action: "UPDATE",
          message: `Updated farm of ${farmer.firstName} ${farmer.lastName}`,
        },
      });
      return farmer;
    }),
  updateFarm: protectedProcedure
    .input(updateFarmSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        farmerId,
        id,
        farmingMethodIds,
        weatherRiskIds,
        coordinates,
        ...rest
      } = input;
      const coordinatesToJson = formatCoordinatesToJSON(coordinates);
      const IsFeatured = !rest.isPublished ? { isFeatured: false } : {};
      const farm = await ctx.db.farm.update({
        where: { id },
        data: {
          ...rest,
          ...IsFeatured,
          coordinates: coordinatesToJson || [],
        },
        include: { Farmer: true },
      });

      await ctx.db.activityLog.create({
        data: {
          farmId: farm.id,
          type: "FARM",
          action: "UPDATE",
          message: `Updated farm of ${farm.Farmer.firstName} ${farm.Farmer.lastName}`,
        },
      });
    }),
  addFarmImage: protectedProcedure
    .input(addFarmImageSchema)
    .mutation(async ({ ctx, input }) => {
      const { farmId, images } = input;
      await ctx.db.farmImage.createMany({
        data: images.map((img) => ({
          url: img,
          farmId,
        })),
      });

      const farmer = await ctx.db.farmer.findFirst({
        where: { Farms: { some: { id: farmId } } },
      });

      await ctx.db.activityLog.create({
        data: {
          farmId: farmId,
          type: "FARM",
          action: "UPDATE",
          message: `Added image/s for ${farmer?.firstName} ${farmer?.lastName} farm`,
        },
      });
    }),
  createFarm: protectedProcedure
    .input(updateFarmSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        farmerId,
        farmingMethodIds,
        weatherRiskIds,
        coordinates,
        ...rest
      } = input;
      if (!farmerId) return;

      const coordinatesToJson = formatCoordinatesToJSON(coordinates);
      const IsFeatured = !rest.isPublished ? { isFeatured: false } : {};
      const farm = await ctx.db.farm.create({
        data: {
          ...rest,
          ...IsFeatured,
          coordinates: coordinatesToJson || [],
          farmerId,
        },
        include: { Farmer: true },
      });

      await ctx.db.activityLog.create({
        data: {
          farmId: farm.id,
          type: "FARM",
          action: "CREATE",
          message: `Created a farm for ${farm.Farmer.firstName} ${farm.Farmer.lastName}`,
        },
      });
      return farm;
    }),
});
