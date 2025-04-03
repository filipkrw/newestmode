import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type RouterContext } from "../router";
import { queryClient } from "../utils/trpc";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
  pendingComponent: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        fontSize: "2rem",
      }}
    >
      Loading...
    </div>
  ),
});

function RouteComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </>
  );
}
