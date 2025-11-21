import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";

export const activityLogRouter = createTRPCRouter({
  getActivityLogs: protectedProcedure
    .input(
      z.object({
        type: z.any(),
        action: z.any(),
        skip: z.number(),
        take: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { type, action, skip, take } = input;
      const whereType = type.toLowerCase() === "all" ? {} : { type };
      const whereAction = action.toLowerCase() === "all" ? {} : { action };
      return ctx.db.activityLog.findMany({
        where: {
          ...whereType,
          ...whereAction,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      });
    }),
  getActivityLogsCount: protectedProcedure
    .input(
      z.object({
        type: z.any(),
        action: z.any(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { type, action } = input;
      const whereType = type.toLowerCase() === "all" ? {} : { type };
      const whereAction = action.toLowerCase() === "all" ? {} : { action };
      return ctx.db.activityLog.count({
        where: {
          ...whereType,
          ...whereAction,
        },
      });
    }),
  createLogLogin: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.activityLog.create({
      data: {
        type: "ACCOUNT",
        action: "LOGIN",
        message: "You logged in.",
      },
    });
  }),
  createLogLogout: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.activityLog.create({
      data: {
        type: "ACCOUNT",
        action: "LOGOUT",
        message: "You logged out.",
      },
    });
  }),
});
