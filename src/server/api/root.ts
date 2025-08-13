import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { weatherRiskRouter } from "./routers/weatherRisk";
import { farmingMethodRouter } from "./routers/farmingMethod";
import { farmerRouter } from "./routers/farmer";
import { farmRouter } from "./routers/farm";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  farmer: farmerRouter,
  farm: farmRouter,
  farmingMethod: farmingMethodRouter,
  weatherRisk: weatherRiskRouter,
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
