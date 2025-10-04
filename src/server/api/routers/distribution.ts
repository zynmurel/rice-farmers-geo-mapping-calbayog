import { formatName } from "@/lib/distributionUtils";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { Distribution } from "@prisma/client";
import z from "zod";

export const distributionRouter = createTRPCRouter({
  getSeletableCrops: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.crop.findMany();
  }),
  getSeletableFertilizer: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.fertilizer.findMany();
  }),
  getDistribution: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.distribution.findUnique({
        where: {
          ...input,
        },
        include: {
          CropDistribution: {
            include: { Crop: true },
          },
          FertilizerDistribution: {
            include: {
              Fertilizer: true,
            },
          },
          Planting: true,
          Farm: {
            include: {
              Farmer: true,
            },
          },
        },
      });
    }),
  upsertCropDistribution: protectedProcedure
    .input(
      z.object({
        cropDistributionId: z.number().optional(),
        distributionId: z.string(),
        cropId: z.string().optional(),
        quantity: z.number(),
        dateGiven: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { cropDistributionId, ...rest } = input;
      return await ctx.db.cropDistribution.upsert({
        where: {
          id: cropDistributionId || 0,
        },
        create: {
          ...rest,
          cropId: rest.cropId || null,
          type: "SEED",
          unit: "KG",
        },
        update: {
          ...rest,
          cropId: rest.cropId || null,
          type: "SEED",
          unit: "KG",
        },
      });
    }),
  upsertFertilizerDistribution: protectedProcedure
    .input(
      z.object({
        fertilizerDistributionId: z.number().optional(),
        distributionId: z.string(),
        fertilizerId: z.string(),
        quantity: z.number(),
        dateGiven: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { fertilizerDistributionId, ...rest } = input;
      return await ctx.db.fertilizerDistribution.upsert({
        where: {
          id: fertilizerDistributionId || 0,
        },
        create: {
          ...rest,
          unit: "KG",
        },
        update: {
          ...rest,
          unit: "KG",
        },
      });
    }),
  upsertPlanting: protectedProcedure
    .input(
      z.object({
        plantingId: z.string().optional(),
        distributionId: z.string(),
        establishmentType: z.enum([
          "Transplanted",
          "Direct Wet Seeded",
          "Direct Dry Seeded",
        ]),
        dateOfSowing: z.date({ required_error: "Date of sowing is required" }),
        dateOfTransplant: z.date().optional(),
        actualHarvestDate: z.date().optional(),
        plantedArea: z.coerce.number().min(0.01, "Planted area is required"),
        plantedQuantity: z.coerce
          .number()
          .min(0.01, "Planted quantity is required"),
        harvestedQuantity: z.coerce.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { plantingId, ...rest } = input;
      return await ctx.db.planting.upsert({
        where: {
          id: plantingId || "not-existing-id",
        },
        create: {
          ...rest,
          plantedUnit: "KG",
          harvestedUnit: "KG",
        },
        update: {
          ...rest,
        },
      });
    }),
  getSearchedFarms: protectedProcedure
    .input(
      z.object({
        barangay: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.farm.findMany({
        where: {
          barangay: input.barangay,
        },
        include: {
          Farmer: true,
        },
      });
    }),
  getDistributions: protectedProcedure
    .input(
      z.object({
        season: z.enum(["WET", "DRY"]).nullable(),
        year: z.string().nullable(),
        barangay: z.string().nullable(),
        skip: z.number(),
        take: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const season = input.season ? { season: input.season } : {};
      const year = input.year ? { year: input.year } : {};
      const barangay = input.barangay
        ? {
            Farm: {
              barangay: input.barangay,
            },
          }
        : {};
      return ctx.db.distribution.findMany({
        where: {
          ...barangay,
          ...season,
          ...year,
        },
        include: {
          Farm: {
            include: {
              Farmer: true,
            },
          },
          CropDistribution: {
            include: { Crop: true, Planting: true },
          },
          FertilizerDistribution: {
            include: {
              Fertilizer: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: input.skip,
        take: input.take,
      });
    }),
  getDistributionsCount: protectedProcedure
    .input(
      z.object({
        season: z.enum(["WET", "DRY"]).nullable(),
        year: z.string().nullable(),
        barangay: z.string().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const season = input.season ? { season: input.season } : {};
      const year = input.year ? { year: input.year } : {};
      const barangay = input.barangay
        ? {
            Farm: {
              barangay: input.barangay,
            },
          }
        : {};
      return ctx.db.distribution.count({
        where: {
          ...barangay,
          ...season,
          ...year,
        },
      });
    }),

  getPlantingDistributions: protectedProcedure
    .input(
      z.object({
        season: z.enum(["WET", "DRY"]).nullable(),
        year: z.string().nullable(),
        barangay: z.string().nullable(),
        skip: z.number(),
        take: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const season = input.season ? { season: input.season } : {};
      const year = input.year ? { year: input.year } : {};
      const barangay = input.barangay
        ? {
            Farm: {
              barangay: input.barangay,
            },
          }
        : {};
      return ctx.db.planting.findMany({
        where: {
          Distribution: {
            ...barangay,
            ...season,
            ...year,
          },
        },
        include: {
          Distribution: {
            include: {
              Farm: {
                include: {
                  Farmer: true,
                },
              },
            },
          },
        },
        orderBy: { dateOfSowing: "desc" },
        skip: input.skip,
        take: input.take,
      });
    }),

  getPlantingDistributionsCount: protectedProcedure
    .input(
      z.object({
        season: z.enum(["WET", "DRY"]).nullable(),
        year: z.string().nullable(),
        barangay: z.string().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const season = input.season ? { season: input.season } : {};
      const year = input.year ? { year: input.year } : {};
      const barangay = input.barangay
        ? {
            Farm: {
              barangay: input.barangay,
            },
          }
        : {};
      return ctx.db.planting.count({
        where: {
          Distribution: {
            ...barangay,
            ...season,
            ...year,
          },
        },
      });
    }),

  createDistribution: protectedProcedure
    .input(
      z.object({
        year: z.string(),
        season: z.enum(["WET", "DRY"]),
        barangay: z.string(),
        who: z.string(),
        what: z.string(),
        when: z.string(),
        where: z.string(),
        why: z.string(),
        Distributions: z.array(
          z.object({
            checked: z.boolean(),
            farmId: z.string(),
            estimatedCropKg: z.number(),
            farmer: z.string(),
            phonenumber: z.string(),
            landArea: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { Distributions, barangay, ...rest } = input;
      try {
        const distributionBatch = await ctx.db.distributionBatch.create({
          data: rest,
        });

        const results = [] as Distribution[];

        await ctx.db.$transaction(async (tx) => {
          for (const dis of Distributions.filter((d) => d.checked)) {
            try {
              const created = await tx.distribution.create({
                data: {
                  distributionBatchId: distributionBatch.id,
                  farmId: dis.farmId,
                  year: rest.year,
                  season: rest.season,
                  CropDistribution: {
                    create: {
                      quantity: dis.estimatedCropKg,
                    },
                  },
                },
              });
              results.push(created);
            } catch (err: any) {
              // check if it's a Prisma unique constraint error
              if (err.code === "P2002") {
                throw new Error(`Unique Constraint ${dis.farmId}`);
              }
              throw err; // rethrow if it's another kind of error
            }
          }
        });

        return results;
      } catch (e) {
        console.error(e);
        throw e;
      }
    }),
});
