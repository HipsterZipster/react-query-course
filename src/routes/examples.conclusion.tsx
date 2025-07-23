import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/examples/conclusion")({
  component: ConclusionExample,
});

interface ResourceLink {
  readonly title: string;
  readonly url: string;
  readonly description: string;
}

/**
 * Conclusion - Summarizing key takeaways and benefits of TanStack Query
 */
function ConclusionExample(): React.ReactElement {
  const resources: readonly ResourceLink[] = [
    {
      title: "TanStack Query Documentation",
      url: "https://tanstack.com/query/latest",
      description:
        "Official documentation with comprehensive guides, examples, and API reference.",
    },
    {
      title: "TanStack Query GitHub Repository",
      url: "https://github.com/TanStack/query",
      description:
        "Source code, issues, and contributions for the TanStack Query library.",
    },
    {
      title: "React Query Patterns",
      url: "https://tkdodo.eu/blog/practical-react-query",
      description:
        "A series of blog posts on practical patterns and best practices.",
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">6. Conclusion</h1>
        <p className="text-gray-600">
          Key takeaways and benefits of using TanStack Query in your React
          applications.
        </p>
      </header>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>

        <div className="space-y-4">
          <div className="p-4 border-l-4 border-green-500 bg-green-50">
            <h3 className="font-medium">Simplified Data Fetching</h3>
            <p className="text-sm">
              TanStack Query eliminates the need for manual state management,
              loading states, and error handling.
            </p>
          </div>

          <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
            <h3 className="font-medium">Automatic Caching and Revalidation</h3>
            <p className="text-sm">
              Built-in caching reduces unnecessary network requests while
              ensuring data stays fresh.
            </p>
          </div>

          <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
            <h3 className="font-medium">Declarative API</h3>
            <p className="text-sm">
              The hooks-based API aligns with React's declarative paradigm,
              making your code more readable and maintainable.
            </p>
          </div>

          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
            <h3 className="font-medium">TypeScript Integration</h3>
            <p className="text-sm">
              First-class TypeScript support ensures type safety throughout your
              application.
            </p>
          </div>

          <div className="p-4 border-l-4 border-red-500 bg-red-50">
            <h3 className="font-medium">DevTools</h3>
            <p className="text-sm">
              Built-in DevTools provide visibility into your cache and help with
              debugging.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          From Java & Angular to React Query
        </h2>

        <div className="space-y-4">
          <p>
            Throughout this course, we've drawn parallels between familiar Java,
            Angular, and vanilla React concepts and React Query:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Java Concept</th>
                  <th className="border p-2 text-left">Angular Concept</th>
                  <th className="border p-2 text-left">Vanilla React</th>
                  <th className="border p-2 text-left">
                    React Query Equivalent
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">
                    EntityManagerFactory / Connection Pool
                  </td>
                  <td className="border p-2">
                    HttpClient / Dependency Injection
                  </td>
                  <td className="border p-2">Custom Context Provider</td>
                  <td className="border p-2">QueryClient</td>
                </tr>
                <tr>
                  <td className="border p-2">Repository / DAO Methods</td>
                  <td className="border p-2">Service Methods</td>
                  <td className="border p-2">fetch() in useEffect</td>
                  <td className="border p-2">queryFn (Query Function)</td>
                </tr>
                <tr>
                  <td className="border p-2">Entity IDs / Primary Keys</td>
                  <td className="border p-2">
                    Route Parameters / trackBy Keys
                  </td>
                  <td className="border p-2">useEffect Dependencies</td>
                  <td className="border p-2">queryKey</td>
                </tr>
                <tr>
                  <td className="border p-2">Second-Level Cache</td>
                  <td className="border p-2">HTTP Interceptor Caching</td>
                  <td className="border p-2">useState + Manual Caching</td>
                  <td className="border p-2">Query Cache</td>
                </tr>
                <tr>
                  <td className="border p-2">Exception Handling</td>
                  <td className="border p-2">HttpErrorResponse / catchError</td>
                  <td className="border p-2">try/catch + useState</td>
                  <td className="border p-2">isError / error</td>
                </tr>
                <tr>
                  <td className="border p-2">CompletableFuture / Future</td>
                  <td className="border p-2">Observable Loading States</td>
                  <td className="border p-2">useState(loading)</td>
                  <td className="border p-2">isPending / isFetching states</td>
                </tr>
                <tr>
                  <td className="border p-2">Manual Cache Refresh</td>
                  <td className="border p-2">Service Method Re-calls</td>
                  <td className="border p-2">Manual fetch() Re-execution</td>
                  <td className="border p-2">invalidateQueries / refetch</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">When to Use React Query</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="border rounded p-4 bg-green-50">
            <h3 className="font-medium mb-2">Great For</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>API data fetching and caching</li>
              <li>Server state management</li>
              <li>Complex data fetching requirements</li>
              <li>Real-time data with polling</li>
              <li>Pagination and infinite scrolling</li>
              <li>Data that requires background updates</li>
            </ul>
          </div>

          <div className="border rounded p-4 bg-red-50">
            <h3 className="font-medium mb-2">Not Ideal For</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Client-only state management</li>
              <li>Form state handling</li>
              <li>UI state that doesn't need persistence</li>
              <li>Simple application state not tied to server data</li>
            </ul>
          </div>
        </div>

        <p className="text-sm bg-blue-50 p-3 rounded">
          For client-only state, consider other options like useState,
          useReducer, or libraries like Zustand. React Query is specialized for
          server state management.
        </p>
      </section>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>

        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.url}
              className="border rounded p-4 hover:bg-gray-50"
            >
              <h3 className="font-medium">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {resource.title}
                </a>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
        <p className="mb-4">
          Now that you've completed this course, try implementing React Query in
          your own projects. Start with simple queries and gradually explore
          more advanced features.
        </p>

        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
