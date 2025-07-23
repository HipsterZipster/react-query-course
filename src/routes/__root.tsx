/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

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
        className: 'bg-blue-50 text-blue-700 font-medium',
      }}
    >
      {label}
    </Link>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <div className="w-full px-4 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 md:flex-shrink-0 md:pr-6 mb-6 md:mb-0">
            <h3 className="font-medium text-lg mb-4">Examples</h3>
            <nav className="space-y-2">
              <SidebarLink to="/examples/introduction" label="1. Introduction" />
              <SidebarLink to="/examples/getting-started" label="2. Getting Started" />
              <SidebarLink to="/examples/basic-query" label="3. Basic Query" />
              <SidebarLink to="/examples/advanced-queries" label="4. Advanced Queries" />
              <SidebarLink to="/examples/suspense" label="5. Suspense" />
            </nav>
            <div className="mt-6 pt-4 border-t">
              <Link to="/" className="text-blue-600 hover:underline">
                &larr; Back to Home
              </Link>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 min-w-0 overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
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
  )
}
