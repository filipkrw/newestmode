import { createFileRoute } from "@tanstack/react-router";
import { useEnsuredQuery } from "../../utils/query";
import { trpc } from "../../utils/trpc";

export const Route = createFileRoute("/_private/dashboard")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trpc.getUsers.queryOptions());
  },
});

function RouteComponent() {
  const [users] = useEnsuredQuery(trpc.getUsers.queryOptions());

  return (
    <div>
      Hello "/_private/dashboard"!
      <pre className="text-xs">{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
