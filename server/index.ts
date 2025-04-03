import {
  fastifyTRPCPlugin,
  type FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context";
import { appRouter, type AppRouter } from "./router";
import cors from "@fastify/cors";
import { db } from "./db/drizzle";
import { AccountSchema } from "./db/schema";

const server = fastify({
  maxParamLength: 5000,
});

server.register(cors, {
  origin: "*",
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

try {
  await server.listen({ port: 3001 });
  console.log(`Server is running at http://localhost:3001`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
