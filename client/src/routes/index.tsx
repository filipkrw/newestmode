import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import { useTRPC } from "../utils/trpc";

export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context: { trpc, queryClient } }) => {
    await queryClient.ensureQueryData(trpc.getUsers.queryOptions());
    return;
  },
  pendingComponent: () => <div>Loading...</div>,
});

function App() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const users = useQuery(trpc.getUsers.queryOptions());
  const createUser = useMutation(trpc.createUser.mutationOptions());

  function invalidateUsers() {
    return queryClient.invalidateQueries({
      queryKey: trpc.getUsers.queryKey(),
    });
  }

  function appendUser(user: { id: string; name: string }) {
    queryClient.setQueryData(trpc.getUsers.queryKey(), (oldData) => {
      return [...(oldData ?? []), user];
    });
  }

  return (
    <div className="App">
      <pre className="text-xs">{JSON.stringify(users?.data, null, 2)}</pre>
      <button
        onClick={() =>
          createUser.mutate(
            { name: "Filip" },
            { onSuccess: (user) => appendUser(user) }
          )
        }
      >
        Add user
      </button>
    </div>
  );
}
