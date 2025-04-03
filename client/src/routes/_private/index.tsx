import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTRPC } from "../../utils/trpc";

import "../../App.css";

export const Route = createFileRoute("/_private/")({
  component: App,
  loader: async ({ context: { trpc, queryClient } }) => {
    console.log("Ensuring query data for getAccounts");
    await queryClient.ensureQueryData(trpc.getAccounts.queryOptions());
  },
});

function App() {
  const trpc = useTRPC();
  const accounts = useQuery(trpc.getAccounts.queryOptions());

  return (
    <div className="App">
      <Outlet />
      <pre className="text-xs">{JSON.stringify(accounts.data, null, 2)}</pre>
    </div>
  );
}
