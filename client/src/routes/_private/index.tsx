import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTRPC } from "../../utils/trpc";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Route = createFileRoute("/_private/")({
  component: App,
  loader: async ({ context: { trpc, queryClient } }) => {
    await sleep(1500);
    await queryClient.ensureQueryData(trpc.getAccounts.queryOptions());
  },
});

function App() {
  const trpc = useTRPC();
  const accounts = useSuspenseQuery(trpc.getAccounts.queryOptions());

  return (
    <div className="App">
      <Outlet />
      <pre className="text-xs">{JSON.stringify(accounts.data, null, 2)}</pre>
    </div>
  );
}
