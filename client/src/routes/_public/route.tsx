import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const token = await context.auth.getToken();
    if (token) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      Hello "/_public"!
      <Outlet />
    </div>
  );
}
