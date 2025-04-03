import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTRPC } from "../../utils/trpc";

import "../../App.css";

export const Route = createFileRoute("/_private/")({
  component: App,
  loader: async ({ context: { trpc, queryClient } }) => {
    await queryClient.ensureQueryData(trpc.getUsers.queryOptions());
  },
});

function App() {
  const trpc = useTRPC();
  const users = useQuery(trpc.getUsers.queryOptions());

  return (
    <div className="App">
      <Outlet />
      <pre className="text-xs">{JSON.stringify(users.data, null, 2)}</pre>
    </div>
  );
}
