import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({  
  component: HomePage,
})

interface ExampleLink {
  readonly title: string;
  readonly path: string;
  readonly description: string;
  readonly isNew?: boolean;
}

function HomePage(): React.ReactElement {
  const examples: readonly ExampleLink[] = [
    {
      title: '1. Introduction',
      path: '/examples/introduction',
      description: 'The problem with traditional React data fetching and how React Query solves it.'
    },
    {
      title: '2. Getting Started',
      path: '/examples/getting-started',
      description: 'Setup QueryClient, QueryClientProvider and integrate React Query DevTools.'
    },
    {
      title: '3. Basic useQuery Hook',
      path: '/examples/basic-query',
      description: 'Learn about queryKey, queryFn, and the core concepts of React Query.'
    },
    {
      title: '4. Advanced Querying Techniques',
      path: '/examples/advanced-queries',
      description: 'Dynamic queries, conditional fetching, and TypeScript integration.'
    },
    {
      title: '5. useSuspenseQuery & React Suspense',
      path: '/examples/suspense',
      description: 'Using React Suspense with React Query for declarative data fetching.',
      isNew: true
    },
    {
      title: '6. Conclusion & Next Steps',
      path: '/examples/conclusion',
      description: 'Key takeaways, benefits of React Query, and additional resources.',
      isNew: true
    }
  ]

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-4xl font-bold mb-2">React Query Course</h1>
        <p className="text-xl text-gray-600">
          From Java Beans to React Hooks: A developer's guide to modern data fetching
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Course Examples</h2>
        <p className="text-gray-600">
          This course is designed for Java developers transitioning to React. Each example
          includes Java analogies to help bridge the mental model gap.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {examples.map(example => (
            <Link
              key={example.path}
              to={example.path}
              className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-lg flex items-center">
                {example.title}
                {example.isNew && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
              </h3>
              <p className="text-gray-600 mt-1">{example.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">React Query DevTools</h2>
        <p className="text-gray-700">
          Throughout this course, you'll see the React Query DevTools panel at the bottom
          of the screen. This powerful tool helps you inspect queries, their states, and cache.
        </p>
      </section>
    </div>
  )
}
