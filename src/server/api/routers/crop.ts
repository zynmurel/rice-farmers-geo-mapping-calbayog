import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";

export const cropRouter = createTRPCRouter({
  upsertCrop: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        title: z.string(),
        variety: z.string(),
        code: z.string().optional(),
        source: z.string(),
        releaseAt: z.date({
          required_error: "Release date is required",
        }),
        season: z.array(z.string()),
        establishment: z.array(z.string()),
        environment: z.array(z.string()),
        seed_classification: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      return ctx.db.crop.upsert({
        where: { id: id || "" },
        create: {
          ...rest,
        },
        update: {
          ...rest,
        },
      });
    }),
  getCrops: protectedProcedure
    .input(
      z.object({
        search: z.string(),
        skip: z.number(),
        take: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, skip, take } = input;
      return ctx.db.crop.findMany({
        where: {
          title: { contains: search, mode: "insensitive" },
        },
        skip,
        take,
      });
    }),
  getCropsCount: protectedProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search } = input;
      return ctx.db.crop.count({
        where: {
          title: { contains: search, mode: "insensitive" },
        },
      });
    }),
});
