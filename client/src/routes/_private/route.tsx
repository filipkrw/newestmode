import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Header } from "../../components/Header";

export const Route = createFileRoute("/_private")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const token = await context.auth.getToken();
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
