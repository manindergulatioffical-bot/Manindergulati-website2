// server/api/trpc.ts
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { getEnv } from "@/lib/env"; // ✅ use getEnv instead of env

const t = initTRPC.context<{
  // your context here
}>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// Example: if you need env in some middleware or context
export const createTRPCContext = () => {
  const env = getEnv(); // ✅ runtime-safe access to environment variables

  return {
    env,
    // other context properties
  };
};

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
// Example placeholder middleware; replace with your actual auth middleware
const authMiddleware = t.middleware(async ({ ctx, next }) => {
  // Add authentication logic here
  return next();
});

export const protectedProcedure = t.procedure.use(authMiddleware);
