import { jsxs, jsx } from 'react/jsx-runtime';

function CodeBlock({
  children,
  language
}) {
  return /* @__PURE__ */ jsx("pre", { className: "bg-gray-800 text-white p-4 rounded overflow-x-auto", children: /* @__PURE__ */ jsx("code", { className: `language-${language}`, children }) });
}
function ConfigOption({
  name,
  type,
  description,
  defaultValue,
  javaAnalogy
}) {
  return /* @__PURE__ */ jsxs("div", { className: "border rounded p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
      /* @__PURE__ */ jsx("code", { className: "bg-gray-100 px-1 font-medium", children: name }),
      /* @__PURE__ */ jsxs("span", { className: "text-gray-500 text-sm", children: [
        "(",
        type,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-1", children: description }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
      "Default: ",
      /* @__PURE__ */ jsx("code", { className: "bg-gray-100 px-1", children: defaultValue })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm bg-blue-50 p-2 rounded", children: [
      /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
      " ",
      javaAnalogy
    ] })
  ] });
}
const SplitComponent = function GettingStartedExample() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2", children: "2. Getting Started with TanStack Query" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Learn how to set up and initialize TanStack Query in your React application." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Installation" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "To get started with TanStack Query, install the package:" }),
      /* @__PURE__ */ jsx("pre", { className: "bg-gray-800 text-white p-4 rounded overflow-x-auto mb-4", children: /* @__PURE__ */ jsx("code", { children: "pnpm add @tanstack/react-query @tanstack/react-query-devtools" }) }),
      /* @__PURE__ */ jsx("p", { children: "For TypeScript support, the types are included in the package." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Basic Setup" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "To use React Query, you need to create a ",
        /* @__PURE__ */ jsx("code", { className: "bg-gray-100 px-1 rounded", children: "QueryClient" }),
        " and wrap your application with ",
        /* @__PURE__ */ jsx("code", { className: "bg-gray-100 px-1 rounded", children: "QueryClientProvider" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "Step 1: Create a QueryClient" }),
        /* @__PURE__ */ jsx(CodeBlock, { language: "typescript", children: `// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: 1,
    },
  },
})` }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 bg-blue-50 p-3 rounded", children: [
          /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
          " This is similar to creating an ",
          /* @__PURE__ */ jsx("code", { children: "EntityManagerFactory" }),
          " or configuring a connection pool in a Java application. It's the central configuration point for all your queries."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "Step 2: Provide the client to your app" }),
        /* @__PURE__ */ jsx(CodeBlock, { language: "tsx", children: `// Wrap your application with QueryClientProvider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourAppComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}` }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 bg-blue-50 p-3 rounded", children: [
          /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
          " This is like setting up a persistence context in a Java EE application, making the EntityManager available to all components."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Configuration Options" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(ConfigOption, { name: "staleTime", type: "number", description: "Time in milliseconds that data remains 'fresh'. After this time, it's considered stale and may trigger a refetch.", defaultValue: "0", javaAnalogy: "Think of this like a cache expiration policy in a Java caching framework like Caffeine or EhCache." }),
        /* @__PURE__ */ jsx(ConfigOption, { name: "gcTime", type: "number", description: "Time in milliseconds that unused/inactive cache data remains in memory before it's garbage collected.", defaultValue: "5 * 60 * 1000 (5 minutes)", javaAnalogy: "Similar to setting timeToLive for cached objects in Java." }),
        /* @__PURE__ */ jsx(ConfigOption, { name: "retry", type: "boolean | number | function", description: "If true, failed queries will retry infinitely. If false, they won't retry. If a number, they'll retry that many times.", defaultValue: "3", javaAnalogy: "Like configuring retry logic in a resilience4j or Spring Retry configuration." }),
        /* @__PURE__ */ jsx(ConfigOption, { name: "refetchOnWindowFocus", type: "boolean | function", description: "If true, queries will refetch when their window is refocused.", defaultValue: "true", javaAnalogy: "There's no direct Java equivalent, but conceptually similar to cache invalidation strategies." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "React Query DevTools" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "The React Query DevTools give you visibility into your queries and cache. They're essential for debugging and optimizing your application." }),
      /* @__PURE__ */ jsx(CodeBlock, { language: "tsx", children: `import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourAppComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}` }),
      /* @__PURE__ */ jsx("p", { className: "mt-2", children: "The DevTools panel is visible at the bottom of this page. Try clicking on it to see the query cache in action." })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=examples.getting-started-B8Rkptum.mjs.map
