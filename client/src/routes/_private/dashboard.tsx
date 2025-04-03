import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../../utils/trpc";

export const Route = createFileRoute("/_private/dashboard")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trpc.getUsers.queryOptions());
  },
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const users = useSuspenseQuery(trpc.getUsers.queryOptions());

  function appendUser() {
    queryClient.setQueryData(trpc.getUsers.queryKey(), (oldData) => {
      const newData = [...(oldData as any), { id: 1, name: "John Doe" }];
      return newData;
    });
  }

  return (
    <div>
      Hello "/_private/dashboard"!
      <pre className="text-xs">{JSON.stringify(users.data, null, 2)}</pre>
      <button onClick={appendUser}>Append user</button>
    </div>
  );
}
