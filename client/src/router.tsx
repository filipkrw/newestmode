import type { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { queryClient, trpc } from "./utils/trpc";

// Gen
import type { useAuth } from "@clerk/clerk-react";
import { routeTree } from "./routeTree.gen";

export interface RouterContext {
  queryClient: QueryClient;
  trpc: typeof trpc;
  auth: ReturnType<typeof useAuth>;
}

const context: RouterContext = {
  queryClient,
  trpc,
  auth: undefined!,
};

export const router = createRouter({
  routeTree,
  context,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPendingComponent: () => <div>Loading...</div>,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
