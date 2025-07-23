import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';

const SplitComponent = function HomePage() {
  const examples = [{
    title: "1. Introduction",
    path: "/examples/introduction",
    description: "The problem with traditional React data fetching and how React Query solves it."
  }, {
    title: "2. Getting Started",
    path: "/examples/getting-started",
    description: "Setup QueryClient, QueryClientProvider and integrate React Query DevTools."
  }, {
    title: "3. Basic useQuery Hook",
    path: "/examples/basic-query",
    description: "Learn about queryKey, queryFn, and the core concepts of React Query."
  }, {
    title: "4. Advanced Querying Techniques",
    path: "/examples/advanced-queries",
    description: "Dynamic queries, conditional fetching, and TypeScript integration."
  }, {
    title: "5. useSuspenseQuery & React Suspense",
    path: "/examples/suspense",
    description: "Using React Suspense with React Query for declarative data fetching.",
    isNew: true
  }, {
    title: "6. Conclusion & Next Steps",
    path: "/examples/conclusion",
    description: "Key takeaways, benefits of React Query, and additional resources.",
    isNew: true
  }];
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-6 space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-2", children: "React Query Course" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600", children: "From Java Beans to React Hooks: A developer's guide to modern data fetching" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Course Examples" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "This course is designed for Java developers transitioning to React. Each example includes Java analogies to help bridge the mental model gap." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-6", children: examples.map((example) => /* @__PURE__ */ jsxs(Link, { to: example.path, className: "block p-6 border rounded-lg hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-medium text-lg flex items-center", children: [
          example.title,
          example.isNew && /* @__PURE__ */ jsx("span", { className: "ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full", children: "NEW" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: example.description })
      ] }, example.path)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-blue-50 p-6 rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "React Query DevTools" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "Throughout this course, you'll see the React Query DevTools panel at the bottom of the screen. This powerful tool helps you inspect queries, their states, and cache." })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=index-CDaI40zk.mjs.map
