import * as React from 'react'
import { Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { api, Post, User } from '../api/mock-api'

export const Route = createFileRoute('/examples/suspense')({
  component: SuspenseExample,
})

/**
 * Suspense Example - Demonstrating useSuspenseQuery and React Suspense integration
 */
function SuspenseExample(): React.ReactElement {
  const [useSuspense, setUseSuspense] = React.useState<boolean>(false)

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">5. useSuspenseQuery and React Suspense</h1>
        <p className="text-gray-600">
          Learn how to use React Suspense with TanStack Query for an even more declarative approach to data fetching.
        </p>
      </header>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Introduction to Suspense for Data Fetching</h2>
        <p className="mb-4">
          React Suspense allows components to "suspend" rendering while they wait for something to happen,
          such as data fetching. TanStack Query integrates with this pattern through useSuspenseQuery.
        </p>
        
        <div className="p-4 bg-blue-50 rounded mb-4">
          <p className="font-medium">Java Analogy</p>
          <p className="text-sm">
            Think of this as a declarative way to handle asynchronous operations, similar to how 
            annotations can simplify configuration in Java frameworks like Spring or Jakarta EE. 
            Instead of imperative error and loading handling, the framework takes care of it based on 
            your declarative structure.
          </p>
        </div>
        
        <div className="flex justify-center mb-6">
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
            <h3 className="text-lg font-medium mb-4">Suspense Example</h3>
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
            <h3 className="text-lg font-medium mb-4">Traditional Example</h3>
            <p className="mb-3 text-sm text-gray-600">
              With the traditional approach, we handle loading and error states manually.
            </p>
            
            <TraditionalPosts />
          </div>
        )}
      </section>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Key Benefits of Suspense</h2>
        
        <div className="space-y-4">
          <BenefitItem
            title="Declarative Loading States"
            description="Define loading UI at the boundary level instead of in each component."
          />
          
          <BenefitItem
            title="Simplified Component Logic"
            description="Components can focus on rendering data without handling loading states."
          />
          
          <BenefitItem
            title="Coordinated Loading States"
            description="Multiple components can load data in parallel with a single loading state."
          />
          
          <BenefitItem
            title="Progressive Loading"
            description="Nest Suspense boundaries to create progressive loading experiences."
          />
        </div>
      </section>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Implementation Example</h2>
        
        <div className="bg-gray-800 text-white p-4 rounded overflow-x-auto mb-4">
          <pre>
{`// Import necessary components
import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'

// Wrap your component with Suspense
function ParentComponent() {
  return (
    <Suspense fallback={<LoadingUI />}>
      <DataComponent />
    </Suspense>
  )
}

// Use suspense query in your component
function DataComponent() {
  // This will suspend the component until data is available
  const { data } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
  
  // No need for loading state!
  return (
    <div>
      {data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}`}
          </pre>
        </div>
        
        <div className="p-4 bg-blue-50 rounded">
          <p className="font-medium">When to Use Suspense vs. Traditional</p>
          <div className="mt-2 space-y-2 text-sm">
            <p>
              <strong>Use Suspense when:</strong> You want cleaner component code, coordinated loading states, 
              or progressive loading experiences.
            </p>
            <p>
              <strong>Use Traditional useQuery when:</strong> You need more granular control over loading states,
              or when you're working with older React versions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * Traditional Posts component using useQuery
 */
function TraditionalPosts(): React.ReactElement {
  const postsQuery = useQuery({
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
          {postsQuery.error instanceof Error 
            ? postsQuery.error.message 
            : 'An unknown error occurred'}
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
  // This will suspend the component until data is available
  const { data } = useSuspenseQuery<readonly Post[]>({
    queryKey: ['posts'],
    queryFn: () => api.getPosts(),
  })
  
  // No loading or error handling here - handled by Suspense and ErrorBoundary
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

interface ErrorBoundaryProps {
  readonly children: React.ReactNode;
}

/**
 * Simple Error Boundary component to handle errors in Suspense
 * Note: In a real app, you'd use a more robust error boundary implementation
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps, 
  { hasError: boolean; error: Error | null }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean; error: Error } {
    return { hasError: true, error };
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
      );
    }

    return this.props.children;
  }
}

interface BenefitItemProps {
  readonly title: string;
  readonly description: string;
}

/**
 * Component to display a single benefit item
 */
function BenefitItem({ 
  title, 
  description 
}: BenefitItemProps): React.ReactElement {
  return (
    <div className="flex items-start">
      <div className="mt-1 mr-3 text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="8"></line>
        </svg>
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
