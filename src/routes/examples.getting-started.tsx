import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createFileRoute('/examples/getting-started')({
  component: GettingStartedExample,
})

/**
 * Getting Started with TanStack Query - Example showing basic setup and configuration
 */
function GettingStartedExample(): React.ReactElement {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">2. Getting Started with TanStack Query</h1>
        <p className="text-gray-600">
          Learn how to set up and initialize TanStack Query in your React application.
        </p>
      </header>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <p className="mb-4">To get started with TanStack Query, install the package:</p>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto mb-4">
          <code>pnpm add @tanstack/react-query @tanstack/react-query-devtools</code>
        </pre>
        <p>For TypeScript support, the types are included in the package.</p>
      </section>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Basic Setup</h2>
        <p className="mb-4">
          To use React Query, you need to create a <code className="bg-gray-100 px-1 rounded">QueryClient</code> and wrap 
          your application with <code className="bg-gray-100 px-1 rounded">QueryClientProvider</code>.
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Step 1: Create a QueryClient</h3>
          <CodeBlock language="typescript">
{`// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: 1,
    },
  },
})`}
          </CodeBlock>
          
          <p className="mt-2 bg-blue-50 p-3 rounded">
            <strong>Java Analogy:</strong> This is similar to creating an <code>EntityManagerFactory</code> or 
            configuring a connection pool in a Java application. It's the central configuration point 
            for all your queries.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Step 2: Provide the client to your app</h3>
          <CodeBlock language="tsx">
{`// Wrap your application with QueryClientProvider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourAppComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}`}
          </CodeBlock>
          
          <p className="mt-2 bg-blue-50 p-3 rounded">
            <strong>Java Analogy:</strong> This is like setting up a persistence context in a Java EE application,
            making the EntityManager available to all components.
          </p>
        </div>
      </section>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Configuration Options</h2>
        
        <div className="space-y-4">
          <ConfigOption 
            name="staleTime" 
            type="number" 
            description="Time in milliseconds that data remains 'fresh'. After this time, it's considered stale and may trigger a refetch." 
            defaultValue="0"
            javaAnalogy="Think of this like a cache expiration policy in a Java caching framework like Caffeine or EhCache."
          />
          
          <ConfigOption 
            name="gcTime" 
            type="number" 
            description="Time in milliseconds that unused/inactive cache data remains in memory before it's garbage collected." 
            defaultValue="5 * 60 * 1000 (5 minutes)"
            javaAnalogy="Similar to setting timeToLive for cached objects in Java."
          />
          
          <ConfigOption 
            name="retry" 
            type="boolean | number | function" 
            description="If true, failed queries will retry infinitely. If false, they won't retry. If a number, they'll retry that many times." 
            defaultValue="3"
            javaAnalogy="Like configuring retry logic in a resilience4j or Spring Retry configuration."
          />
          
          <ConfigOption 
            name="refetchOnWindowFocus" 
            type="boolean | function" 
            description="If true, queries will refetch when their window is refocused." 
            defaultValue="true"
            javaAnalogy="There's no direct Java equivalent, but conceptually similar to cache invalidation strategies."
          />
        </div>
      </section>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">React Query DevTools</h2>
        <p className="mb-4">
          The React Query DevTools give you visibility into your queries and cache. 
          They're essential for debugging and optimizing your application.
        </p>
        <CodeBlock language="tsx">
{`import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourAppComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}`}
        </CodeBlock>
        <p className="mt-2">
          The DevTools panel is visible at the bottom of this page. Try clicking on it to see the query cache in action.
        </p>
      </section>
    </div>
  )
}

interface CodeBlockProps {
  readonly children: string;
  readonly language: string;
}

/**
 * Renders a syntax-highlighted code block
 */
function CodeBlock({ children, language }: CodeBlockProps): React.ReactElement {
  return (
    <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
      <code className={`language-${language}`}>{children}</code>
    </pre>
  )
}

interface ConfigOptionProps {
  readonly name: string;
  readonly type: string;
  readonly description: string;
  readonly defaultValue: string;
  readonly javaAnalogy: string;
}

/**
 * Renders a configuration option with description and Java analogy
 */
function ConfigOption({ 
  name, 
  type, 
  description, 
  defaultValue, 
  javaAnalogy 
}: ConfigOptionProps): React.ReactElement {
  return (
    <div className="border rounded p-4">
      <div className="flex items-start gap-2 mb-2">
        <code className="bg-gray-100 px-1 font-medium">{name}</code>
        <span className="text-gray-500 text-sm">({type})</span>
      </div>
      <p className="mb-1">{description}</p>
      <p className="text-sm text-gray-600">Default: <code className="bg-gray-100 px-1">{defaultValue}</code></p>
      <p className="mt-2 text-sm bg-blue-50 p-2 rounded">
        <strong>Java Analogy:</strong> {javaAnalogy}
      </p>
    </div>
  )
}
