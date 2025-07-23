import * as React from 'react'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/examples')({
  component: ExamplesLayout,
})

function ExamplesLayout(): React.ReactElement {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 pr-8">
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
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

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
