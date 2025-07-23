/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import { CollapseContentIcon, ExpandContentIcon } from "~/components/icons";
import appCss from "~/styles/app.css?url";


interface SidebarLinkProps {
  readonly to: string;
  readonly label: string;
}

function SidebarLink({ to, label }: SidebarLinkProps): React.ReactElement {
  return (
    <Link
      to={to}
      className="block p-2 hover:bg-gray-100 rounded transition-colors"
      activeProps={{
        className: "bg-blue-50 text-blue-700 font-medium",
      }}
    >
      {label}
    </Link>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "React Query Course | Learn TanStack Query",
      },
      {
        name: "description",
        content: "Learn React Query (TanStack Query) with practical examples and hands-on tutorials.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <RootDocument>
      <div className="w-full px-4 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Navigation */}
          <div className={`transition-all duration-300 ease-in-out ${
            isSidebarCollapsed 
              ? 'w-12 md:w-12' 
              : 'w-full md:w-64'
          } md:flex-shrink-0 md:pr-6 mb-6 md:mb-0`}>
            {/* Sidebar Header with Toggle */}
            <div className="flex items-center justify-between mb-4">
              {!isSidebarCollapsed && (
                <h3 className="font-medium text-lg">Examples</h3>
              )}
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isSidebarCollapsed ? (
                  <ExpandContentIcon className="w-5 h-5" />
                ) : (
                  <CollapseContentIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Navigation Links */}
            {!isSidebarCollapsed && (
              <>
                <nav className="space-y-2">
                  <SidebarLink
                    to="/examples/introduction"
                    label="1. Introduction"
                  />
                  <SidebarLink
                    to="/examples/getting-started"
                    label="2. Getting Started"
                  />
                  <SidebarLink to="/examples/basic-query" label="3. Basic Query" />
                  <SidebarLink
                    to="/examples/advanced-queries"
                    label="4. Advanced Queries"
                  />
                  <SidebarLink to="/examples/mutations" label="5. Mutations" />
                  <SidebarLink to="/examples/suspense" label="6. Suspense" />
                  <SidebarLink to="/examples/conclusion" label="7. Conclusion" />
                </nav>
                <div className="mt-6 pt-4 border-t">
                  <Link to="/" className="text-blue-600 hover:underline">
                    &larr; Back to Home
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
