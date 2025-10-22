import { createCallerFactory, createTRPCRouter } from "./trpc";
import { productsRouter } from "./routers/products";
import { statsRouter } from "./routers/stats";

export const appRouter = createTRPCRouter({
  products: productsRouter,
  stats: statsRouter,
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
