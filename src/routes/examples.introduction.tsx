import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/examples/introduction')({
  component: IntroductionExample,
})

/**
 * Introduction to React Query - Example showing the difference between 
 * traditional React state management and React Query
 */
function IntroductionExample(): React.ReactElement {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">1. Introduction: Bridging the Gap</h1>
        <p className="text-gray-600">
          This example demonstrates why React Query matters for Java developers transitioning to front-end,
          showing the difference between traditional state management and React Query.
        </p>
      </header>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">The Problem: Traditional Approach</h2>
        <p className="mb-4">
          In traditional React, managing server state requires manual handling of loading states, 
          errors, and data caching. For Java developers, this is like manually writing JDBC code 
          without using Hibernate or JPA.
        </p>
        <TraditionalExample />
      </section>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">The Solution: React Query</h2>
        <p className="mb-4">
          React Query provides a powerful abstraction for managing server state, similar to how
          Hibernate/JPA abstracts database interactions in Java. It handles caching, loading states,
          and errors for you.
        </p>
        <p className="mb-4 bg-blue-50 p-3 rounded">
          <strong>Java Analogy:</strong> Think of React Query as a state management framework similar to 
          JPA/Hibernate in Java. It provides a caching layer, handles the lifecycle of data fetching, 
          and abstracts away much of the boilerplate code.
        </p>
        <p>
          We'll look at a React Query implementation in the next example.
        </p>
      </section>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Key Benefits</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Automatic loading & error states</li>
          <li>Built-in caching & stale-while-revalidate</li>
          <li>Automatic background refetching</li>
          <li>Pagination & infinite scrolling support</li>
          <li>Optimistic updates</li>
          <li>TypeScript integration (similar to strong typing in Java)</li>
        </ul>
      </section>
    </div>
  )
}

/**
 * Traditional example showing manual state management
 */
function TraditionalExample(): React.ReactElement {
  // State for traditional data fetching
  const [data, setData] = useState<readonly User[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  
  // Fetch data manually
  const fetchData = async (): Promise<void> => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'))
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="border p-4 rounded bg-gray-50">
      <div className="mb-4">
        <h3 className="font-medium">Traditional React Data Fetching</h3>
        <p className="text-sm text-gray-600">
          Notice how we need to manually manage loading state, errors, and data.
        </p>
      </div>
      
      <div className="mb-4">
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Fetch Users'}
        </button>
      </div>
      
      {error && (
        <div className="p-3 mb-4 bg-red-50 text-red-700 border border-red-200 rounded">
          Error: {error.message}
        </div>
      )}
      
      {data && (
        <div>
          <h4 className="font-medium mb-2">Users:</h4>
          <ul className="border rounded divide-y">
            {data.map((user) => (
              <li key={user.id} className="p-2">
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-yellow-50 rounded text-sm">
        <p><strong>Java Analogy:</strong> This is like writing raw JDBC code where you manually:</p>
        <ul className="list-disc pl-6 mt-1">
          <li>Create connections</li>
          <li>Handle exceptions</li>
          <li>Map result sets to objects</li>
          <li>Close resources</li>
        </ul>
      </div>
    </div>
  )
}

// Types
interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
}
