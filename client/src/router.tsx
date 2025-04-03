import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { queryClient, trpc } from "./utils/trpc";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    trpc,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});
