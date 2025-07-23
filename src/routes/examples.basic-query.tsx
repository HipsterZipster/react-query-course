import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api, useErrorToggle } from "~/api/mock-api";
import { CodeExample } from "~/components/examples/shared/code-example";
import { CodeComparison } from "~/components/examples/shared/code-comparison";
import {
  userListAngularCode,
  userListReactQueryCode,
  userListVanillaCode,
} from "~/components/code-for-examples";

export const Route = createFileRoute("/examples/basic-query")({
  component: BasicQueryExample,
});

/**
 * Basic Query Example - Demonstrating the core concepts of the useQuery hook
 */
function BasicQueryExample(): React.ReactElement {
  const [shouldError, toggleError] = useErrorToggle();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">
          3. The useQuery Hook: Your New Best Friend
        </h1>
        <p className="text-gray-600">
          Learn the core concepts of querying data with React Query's useQuery
          hook.
        </p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">The useQuery Hook</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
            Why is this useful?
          </h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            The useQuery hook eliminates the boilerplate code needed for data
            fetching in React. It automatically handles loading states, error
            handling, caching, and background refetching. This means less code
            to write and maintain, while getting better user experience out of
            the box.
          </p>
        </div>
      </section>

      {/* 2-Column Layout: Core Concepts + Basic Example */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column: Core Concepts */}
        <section className="bg-white p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Core Concepts</h2>

          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h3 className="font-medium">queryKey</h3>
              <p className="text-sm text-gray-700">
                A unique identifier for your data. Similar to a primary key in a
                database or a key in a HashMap.
              </p>
              <div className="mt-1 space-y-1">
                <p className="text-xs bg-blue-100 p-2 rounded">
                  <strong>Java Analogy:</strong> Like a unique identifier in a
                  Java Map or database primary key.
                </p>
                <p className="text-xs bg-red-100 p-2 rounded">
                  <strong>Angular Analogy:</strong> Like a trackBy function key
                  in Angular's *ngFor or a route parameter identifier.
                </p>
              </div>
            </div>

            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h3 className="font-medium">queryFn</h3>
              <p className="text-sm text-gray-700">
                The asynchronous function that fetches your data (e.g., using
                fetch or axios).
              </p>
              <p className="mt-1 text-xs bg-green-100 p-2 rounded">
                <strong>Analogy:</strong> This is like your DAO or Repository
                method that retrieves data from a database.
              </p>
            </div>
          </div>
        </section>

        {/* Right Column: Basic Example */}
        <section className="bg-white p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Basic useQuery Example</h2>
          <div className="overflow-x-auto">
            <pre className="bg-gray-800 text-white p-4 rounded w-full text-sm">
              <code>{`const { data, isPending, isError, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
})`}</code>
            </pre>
          </div>
        </section>
      </div>

      {/* Full Width Row: Live Example */}
      <section className="bg-white p-6 border rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Live Example: User List</h2>
          <button
            onClick={toggleError}
            className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded text-sm"
          >
            Toggle Error State
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          This example uses React Query to fetch a list of users. Notice how
          loading, error states, and data are automatically handled for you.
        </p>

        <CodeExample
          title="Fetching a List of Users"
          code={[
            {
              name: "React Query",
              code: userListReactQueryCode,
              language: "typescript",
            },
            {
              name: "Vanilla React",
              code: userListVanillaCode,
              language: "typescript",
            },
            {
              name: "Angular",
              code: userListAngularCode,
              language: "typescript",
            },
          ]}
        >
          <UserListWithQuery shouldError={shouldError} />
        </CodeExample>
      </section>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">What You Get Back</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <QueryResultItem
            name="data"
            description="The successful response payload from your API."
            javaAnalogy="Like the entity objects returned from a JPA repository method."
            angularAnalogy="Like the response data from an Angular HttpClient observable."
          />

          <QueryResultItem
            name="isPending"
            description="Boolean indicating if the query is in a loading state."
            javaAnalogy="Like checking if a Future or CompletableFuture is done in Java."
            angularAnalogy="Like using a loading flag with Angular's async pipe or subscription."
          />

          <QueryResultItem
            name="isError"
            description="Boolean indicating if the query encountered an error."
            javaAnalogy="Similar to catching exceptions in a try-catch block."
            angularAnalogy="Like handling errors in an Angular HttpClient catchError operator."
          />

          <QueryResultItem
            name="error"
            description="The error object thrown by queryFn if the query failed."
            javaAnalogy="Like the Exception object in a Java catch block."
            angularAnalogy="Like the HttpErrorResponse object in Angular's error handling."
          />

          <QueryResultItem
            name="refetch"
            description="Function to manually trigger a refetch of the query data."
            javaAnalogy="Like explicitly calling a refresh method on a data source in Java."
            angularAnalogy="Like manually calling a service method to reload data in Angular."
          />

          <QueryResultItem
            name="isFetching"
            description="Boolean indicating if the query is currently fetching data (including background refetching)."
            javaAnalogy="Similar to checking if a background task is running in Java."
            angularAnalogy="Like tracking HTTP request state with Angular's loading interceptors."
          />
        </div>
      </section>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Key Benefits Over Traditional Approach
        </h2>

        <div className="space-y-3">
          <BenefitItem
            title="Automatic Loading & Error States"
            description="No more manual flags and error state management."
          />

          <BenefitItem
            title="Caching"
            description="Results are cached by queryKey and reused across components."
          />

          <BenefitItem
            title="Automatic Refetching"
            description="Data is automatically kept fresh based on your configuration."
          />

          <BenefitItem
            title="Shared Query Results"
            description="Multiple components can use the same data without duplicate requests."
          />

          <BenefitItem
            title="TypeScript Integration"
            description="Full type safety for your queries and results."
          />
        </div>
      </section>

      {/* Code Comparison Section */}
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">📋 Code Comparison</h2>
        <p className="text-gray-600 mb-4">
          See the difference between React Query and manual data fetching
          approaches:
        </p>
        <BasicQueryCodeComparison />
      </section>

      {/* Basic Query Code Reduction Analysis */}
      <section className="bg-gradient-to-br from-green-50 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-xl border border-green-200 dark:border-green-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          📊 Basic Query Code Reduction Analysis
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Vanilla React Analysis */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-red-200 dark:border-red-700">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
              ❌ Vanilla React Approach
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Lines:
                </span>
                <span className="font-bold text-red-600">45 lines</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• 8 lines: Manual state management</div>
                <div>• 15 lines: useEffect with error handling</div>
                <div>• 12 lines: Loading and error UI</div>
                <div>• 10 lines: Success state rendering</div>
              </div>
            </div>
          </div>

          {/* React Query Analysis */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-green-200 dark:border-green-700">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
              ✅ React Query Approach
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Lines:
                </span>
                <span className="font-bold text-green-600">25 lines</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• 3 lines: useQuery hook setup</div>
                <div>• 6 lines: Loading and error UI</div>
                <div>• 16 lines: Success state rendering</div>
                <div>• 0 lines: Manual state management!</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            🎯 Basic Query Impact
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            <strong>Code Reduction:</strong> 44% less code to write
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Lines Saved:</strong> 20 lines per query
          </p>
        </div>
      </section>
    </div>
  );
}

function BasicQueryCodeComparison() {
  return (
    <CodeComparison
      title="Compare Basic Query Implementation"
      beforeCode={userListVanillaCode}
      afterCode={userListReactQueryCode}
      beforeTitle="❌ Vanilla React (45 lines)"
      afterTitle="✅ React Query (25 lines)"
    />
  );
}

/**
 * Example component demonstrating useQuery to fetch and display users
 */
function UserListWithQuery({
  shouldError,
}: {
  readonly shouldError: boolean;
}): React.ReactElement {
  const usersQuery = useQuery({
    queryKey: ["users", { error: shouldError }],
    queryFn: () => api.getUsers(shouldError),
  });

  const { data, isPending, isError, error, refetch } = usersQuery;

  if (isPending) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-700 font-medium mb-2">Error Loading Users</h3>
        <p className="text-red-600 mb-4">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">User List</h3>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm"
        >
          Refetch
        </button>
      </div>

      <ul className="divide-y border rounded">
        {data?.map((user) => (
          <li key={user.id} className="p-3 hover:bg-gray-50">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <div className="text-xs mt-1 inline-block px-2 py-1 bg-gray-100 rounded-full">
              {user.role}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
        <p>
          <strong>Note:</strong> The query results are cached. Try navigating
          away and coming back - the data will be instantly available while a
          background refetch occurs.
        </p>
      </div>
    </div>
  );
}

interface QueryResultItemProps {
  readonly name: string;
  readonly description: string;
  readonly javaAnalogy: string;
  readonly angularAnalogy: string;
}

/**
 * Component to display a single query result property with description and Analogies
 */
function QueryResultItem({
  name,
  description,
  javaAnalogy,
  angularAnalogy,
}: QueryResultItemProps): React.ReactElement {
  return (
    <div className="border rounded p-4">
      <code className="bg-gray-100 px-1 font-medium">{name}</code>
      <p className="text-sm mt-1">{description}</p>
      <div className="mt-2 space-y-2">
        <p className="text-xs bg-blue-50 p-2 rounded">
          <strong>Java Analogy:</strong> {javaAnalogy}
        </p>
        <p className="text-xs bg-red-50 p-2 rounded">
          <strong>Angular Analogy:</strong> {angularAnalogy}
        </p>
      </div>
    </div>
  );
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
  description,
}: BenefitItemProps): React.ReactElement {
  return (
    <div className="flex items-start">
      <div className="mt-1 mr-3 text-green-500">
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
