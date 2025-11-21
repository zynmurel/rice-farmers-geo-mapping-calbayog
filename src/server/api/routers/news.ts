import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const createNewsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(5, "Content must be at least 5 characters"),
  images: z.array(z.string()).optional(),
});

const updateNewsSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  images: z
    .array(
      z.object({
        id: z.string().optional(),
        url: z.array(z.string()),
        caption: z.string().optional(),
        order: z.number().optional(),
        isFeatured: z.boolean().optional(),
      }),
    )
    .optional(),
});

export const newsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        skip: z.number(),
        take: z.number(),
        date: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { skip, take, date } = input;
      let where: any = {};

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        where = {
          postedAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        };
      }

      return await ctx.db.news.findMany({
        where,
        orderBy: { postedAt: "desc" },
        skip,
        take,
        include: {
          NewsImage: true,
        },
      });
    }),
  getAllCount: protectedProcedure
    .input(
      z.object({
        skip: z.number(),
        take: z.number(),
        date: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { date } = input;
      let where: any = {};

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        where = {
          postedAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        };
      }

      return await ctx.db.news.count({ where });
    }),

  create: protectedProcedure
    .input(createNewsSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, content, images } = input;

      const news = await ctx.db.news.create({
        data: {
          title,
          content,
          NewsImage: images?.length
            ? {
                create: images.map((img) => ({
                  url: img,
                })),
              }
            : undefined,
        },
        include: { NewsImage: true },
      });

      await ctx.db.activityLog.create({
        data: {
          newsId: news.id,
          type: "NEWS",
          action: "CREATE",
          message: `Created a news`,
        },
      });

      return news;
    }),

  update: protectedProcedure
    .input(updateNewsSchema)
    .mutation(async ({ ctx, input }) => {}),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {}),
});
