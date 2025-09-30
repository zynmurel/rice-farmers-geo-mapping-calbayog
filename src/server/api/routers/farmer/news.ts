import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";

export const farmerNewsRouter = createTRPCRouter({
  getNews: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.news.findMany({
      orderBy: {
        postedAt: "desc",
      },
      include: {
        NewsImage: true,
      },
    });
  }),
});
