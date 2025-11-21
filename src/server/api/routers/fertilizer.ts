import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";

export const fertilizerRouter = createTRPCRouter({
  upsertFertilizer: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        type: z.string(),
        type2: z.string(),
        type3: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      const fertilzer = await ctx.db.fertilizer.upsert({
        where: { id: id || "" },
        create: {
          ...rest,
        },
        update: {
          ...rest,
        },
      });

      await ctx.db.activityLog.create({
        data: {
          fertilizerId: fertilzer.id,
          type: "FERTILIZER",
          action: !id ? "UPDATE" : "CREATE",
          message: `${!id ? "Created" : "Updated"} fertilizer ${fertilzer.name}`,
        },
      });
      return fertilzer;
    }),
  getFertilizer: protectedProcedure
    .input(
      z.object({
        search: z.string(),
        skip: z.number(),
        take: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, skip, take } = input;
      return ctx.db.fertilizer.findMany({
        where: {
          name: { contains: search, mode: "insensitive" },
        },
        skip,
        take,
      });
    }),
  getFertilizerCount: protectedProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search } = input;
      return ctx.db.fertilizer.count({
        where: {
          name: { contains: search, mode: "insensitive" },
        },
      });
    }),
});
