import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';

const SplitComponent = function ConclusionExample() {
  const resources = [{
    title: "TanStack Query Documentation",
    url: "https://tanstack.com/query/latest",
    description: "Official documentation with comprehensive guides, examples, and API reference."
  }, {
    title: "TanStack Query GitHub Repository",
    url: "https://github.com/TanStack/query",
    description: "Source code, issues, and contributions for the TanStack Query library."
  }, {
    title: "TanStack Query v5 Migration Guide",
    url: "https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5",
    description: "Guide for migrating from v4 to v5 of TanStack Query."
  }, {
    title: "React Query Patterns",
    url: "https://tkdodo.eu/blog/practical-react-query",
    description: "A series of blog posts on practical patterns and best practices."
  }];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2", children: "6. Conclusion" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Key takeaways and benefits of using TanStack Query in your React applications." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Key Takeaways" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-l-4 border-green-500 bg-green-50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Simplified Data Fetching" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "TanStack Query eliminates the need for manual state management, loading states, and error handling." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-l-4 border-blue-500 bg-blue-50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Automatic Caching and Revalidation" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Built-in caching reduces unnecessary network requests while ensuring data stays fresh." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-l-4 border-purple-500 bg-purple-50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Declarative API" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "The hooks-based API aligns with React's declarative paradigm, making your code more readable and maintainable." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-l-4 border-yellow-500 bg-yellow-50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "TypeScript Integration" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "First-class TypeScript support ensures type safety throughout your application." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-l-4 border-red-500 bg-red-50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "DevTools" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Built-in DevTools provide visibility into your cache and help with debugging." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "From Java to React Query" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("p", { children: "Throughout this course, we've drawn parallels between familiar Java concepts and React Query:" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border-collapse border", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "border p-2 text-left", children: "Java Concept" }),
            /* @__PURE__ */ jsx("th", { className: "border p-2 text-left", children: "React Query Equivalent" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "EntityManagerFactory / Connection Pool" }),
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "QueryClient" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "Repository / DAO Methods" }),
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "queryFn (Query Function)" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "Entity IDs / Primary Keys" }),
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "queryKey" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "Second-Level Cache" }),
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "Query Cache" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "Exception Handling" }),
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "isError / error" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "CompletableFuture / Future" }),
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "isPending / isFetching states" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "Manual Cache Refresh" }),
              /* @__PURE__ */ jsx("td", { className: "border p-2", children: "invalidateQueries / refetch" })
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "When to Use React Query" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "border rounded p-4 bg-green-50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Great For" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: "API data fetching and caching" }),
            /* @__PURE__ */ jsx("li", { children: "Server state management" }),
            /* @__PURE__ */ jsx("li", { children: "Complex data fetching requirements" }),
            /* @__PURE__ */ jsx("li", { children: "Real-time data with polling" }),
            /* @__PURE__ */ jsx("li", { children: "Pagination and infinite scrolling" }),
            /* @__PURE__ */ jsx("li", { children: "Data that requires background updates" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border rounded p-4 bg-red-50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Not Ideal For" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: "Client-only state management" }),
            /* @__PURE__ */ jsx("li", { children: "Form state handling" }),
            /* @__PURE__ */ jsx("li", { children: "UI state that doesn't need persistence" }),
            /* @__PURE__ */ jsx("li", { children: "Simple application state not tied to server data" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm bg-blue-50 p-3 rounded", children: "For client-only state, consider other options like useState, useReducer, or libraries like Zustand. React Query is specialized for server state management." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Additional Resources" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: resources.map((resource) => /* @__PURE__ */ jsxs("div", { className: "border rounded p-4 hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium", children: /* @__PURE__ */ jsx("a", { href: resource.url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline", children: resource.title }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: resource.description })
      ] }, resource.url)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-6 rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-3", children: "Next Steps" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Now that you've completed this course, try implementing React Query in your own projects. Start with simple queries and gradually explore more advanced features." }),
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
        "Return to Home"
      ] })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=examples.conclusion-DFKMhmFF.mjs.map
