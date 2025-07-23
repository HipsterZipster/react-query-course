import * as React from 'react'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/examples')({
  component: ExamplesLayout,
})

function ExamplesLayout(): React.ReactElement {
  return <Outlet />
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
