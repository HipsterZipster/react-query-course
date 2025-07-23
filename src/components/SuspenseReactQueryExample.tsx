import * as React from 'react'
import { Suspense } from 'react'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { api, Post } from '../api/mock-api'

/**
 * Traditional Posts component using useQuery
 */
function TraditionalPosts(): React.ReactElement {
  const postsQuery = useQuery<readonly Post[], Error>({
    queryKey: ['posts'],
    queryFn: () => api.getPosts(),
  })

  if (postsQuery.isPending) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (postsQuery.isError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-700 font-medium mb-2">Error Loading Posts</h3>
        <p className="text-red-600">
          {postsQuery.error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="border rounded divide-y">
      {postsQuery.data?.map((post) => (
        <div key={post.id} className="p-3">
          <h3 className="font-medium">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.content.substring(0, 100)}...</p>
          <div className="mt-1 text-xs text-gray-500">
            Author ID: {post.authorId} | {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Suspense Posts component using useSuspenseQuery
 */
function SuspensePosts(): React.ReactElement {
  const { data } = useSuspenseQuery<readonly Post[]>({ 
    queryKey: ['posts'], 
    queryFn: () => api.getPosts(),
  })

  return (
    <div className="border rounded divide-y">
      {data.map((post) => (
        <div key={post.id} className="p-3">
          <h3 className="font-medium">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.content.substring(0, 100)}...</p>
          <div className="mt-1 text-xs text-gray-500">
            Author ID: {post.authorId} | {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Loading fallback component for Suspense
 */
function LoadingFallback(): React.ReactElement {
  return (
    <div className="p-8 text-center">
      <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
      <p>Loading data with Suspense...</p>
    </div>
  )
}

class ErrorBoundary extends React.Component<
  { readonly children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { readonly children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean; error: Error } {
    return { hasError: true, error }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-700 font-medium mb-2">Something went wrong</h3>
          <p className="text-red-600">
            {this.state.error?.message || 'An unknown error occurred'}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

// Main component to render
export function SuspenseReactQueryExample() {
  const [useSuspense, setUseSuspense] = React.useState<boolean>(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setUseSuspense(false)}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              !useSuspense
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
          >
            Traditional useQuery
          </button>
          <button
            type="button"
            onClick={() => setUseSuspense(true)}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              useSuspense
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
          >
            useSuspenseQuery
          </button>
        </div>
      </div>

      {useSuspense ? (
        <div>
          <h3 className="text-lg font-medium mb-2">Suspense Example</h3>
          <p className="mb-3 text-sm text-gray-600">
            Notice how we don't need to handle loading states manually. React Suspense takes care of it.
          </p>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <SuspensePosts />
            </Suspense>
          </ErrorBoundary>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">Traditional Example</h3>
          <TraditionalPosts />
        </div>
      )}
    </div>
  );
}
