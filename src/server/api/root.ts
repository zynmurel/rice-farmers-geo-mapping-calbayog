import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { farmerRouter } from "./routers/farmer";
import { farmRouter } from "./routers/farm";
import { publicRouter } from "./routers/public";
import { cropRouter } from "./routers/crop";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  public : publicRouter,
  farmer: farmerRouter,
  farm: farmRouter,
  crop: cropRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
