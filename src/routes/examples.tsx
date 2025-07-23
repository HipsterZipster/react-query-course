import * as React from "react";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/examples")({
  component: ExamplesLayout,
});

function ExamplesLayout(): React.ReactElement {
  return <Outlet />;
}
