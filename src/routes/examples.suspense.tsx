import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CodeExample } from "../components/examples/shared/code-example";
import {
  suspenseTraditionalReactQueryCode,
  suspenseReactQueryCode,
  suspenseVanillaCode,
  suspenseAngularCode,
} from "../components/code-for-examples";
import { SuspenseReactQueryExample } from "../components/examples/suspense/SuspenseReactQueryExample";

export const Route = createFileRoute("/examples/suspense")({
  component: SuspenseExample,
});

/**
 * React Suspense with React Query - Demonstrating useSuspenseQuery for cleaner loading states
 * This example shows the evolution from manual loading states to declarative Suspense boundaries
 */
function SuspenseExample(): React.ReactElement {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">
          5. React Suspense with React Query
        </h1>
        <p className="text-gray-600">
          Learn how to use React Suspense with React Query for cleaner loading
          state management.
        </p>
      </header>

      <CodeExample
        title="Suspense with React Query"
        why={
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 mb-4">
            <h3 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
              Why is this useful?
            </h3>
            <p className="text-indigo-700 dark:text-indigo-300 text-sm">
              React Suspense with useSuspenseQuery provides a more declarative
              approach to handling loading states. Instead of manually checking
              loading states in each component, you can use Suspense boundaries
              to handle loading UI at a higher level. This leads to cleaner
              component code and better separation of concerns.
            </p>
          </div>
        }
        code={[
          {
            name: "Traditional React Query",
            code: suspenseTraditionalReactQueryCode,
            language: "typescript",
          },
          {
            name: "React Query Suspense",
            code: suspenseReactQueryCode,
            language: "typescript",
          },
          {
            name: "Vanilla React",
            code: suspenseVanillaCode,
            language: "typescript",
          },
          {
            name: "Angular",
            code: suspenseAngularCode,
            language: "typescript",
          },
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Compare traditional loading state management with React Suspense
            approach.
          </p>
          <SuspenseReactQueryExample />
        </div>
      </CodeExample>
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Benefits of Using Suspense
        </h2>
        <div className="space-y-4">
          <BenefitItem
            title="Declarative Loading States"
            description="Instead of manually checking for loading states with boolean flags, you can declaratively specify a loading fallback component."
          />
          <BenefitItem
            title="Simplified Component Logic"
            description="Your components can focus on their primary rendering logic, assuming data is always present. This makes them cleaner and easier to read."
          />
          <BenefitItem
            title="Coordinated Loading for Multiple Components"
            description="React can coordinate loading for multiple components that suspend, showing a single loading indicator for all of them."
          />
          <BenefitItem
            title="Coordinated Loading for Multiple Components"
            description="React can coordinate loading for multiple components that suspend, showing a single loading indicator for all of them."
          />
          <BenefitItem
            title="Improved User Experience"
            description="Suspense helps avoid jarring UI updates by waiting for all necessary data before rendering the next screen."
          />
        </div>
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
            {/* Suspense use cases */}
            <p>
              <strong>Use Suspense when:</strong> You want cleaner component
              code, coordinated loading states, or progressive loading
              experiences.
            </p>
            {/* Traditional useQuery use cases */}
            <p>
              <strong>Use Traditional useQuery when:</strong> You need more
              granular control over loading states, or when you're working with
              older React versions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Props interface for the BenefitItem component
interface BenefitItemProps {
  readonly title: string;
  readonly description: string;
}

/**
 * Reusable component for displaying benefit items with icons
 * Used throughout the Suspense page to highlight key advantages
 */
function BenefitItem({
  title,
  description,
}: BenefitItemProps): React.ReactElement {
  return (
    <div className="flex items-start">
      {/* Info icon for visual appeal */}
      <div className="mt-1 mr-3 text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
  );
}
