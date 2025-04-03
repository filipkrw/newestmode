import { SignInButton } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_public/login"!
      <SignInButton />
    </div>
  );
}
