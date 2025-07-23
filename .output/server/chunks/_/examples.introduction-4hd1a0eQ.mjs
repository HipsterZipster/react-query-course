import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';

function TraditionalExample() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "border p-4 rounded bg-gray-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Traditional React Data Fetching" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Notice how we need to manually manage loading state, errors, and data." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("button", { onClick: fetchData, className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors", disabled: isLoading, children: isLoading ? "Loading..." : "Fetch Users" }) }),
    error && /* @__PURE__ */ jsxs("div", { className: "p-3 mb-4 bg-red-50 text-red-700 border border-red-200 rounded", children: [
      "Error: ",
      error.message
    ] }),
    data && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Users:" }),
      /* @__PURE__ */ jsx("ul", { className: "border rounded divide-y", children: data.map((user) => /* @__PURE__ */ jsxs("li", { className: "p-2", children: [
        user.name,
        " - ",
        user.email
      ] }, user.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 bg-yellow-50 rounded text-sm", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
        " This is like writing raw JDBC code where you manually:"
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-1", children: [
        /* @__PURE__ */ jsx("li", { children: "Create connections" }),
        /* @__PURE__ */ jsx("li", { children: "Handle exceptions" }),
        /* @__PURE__ */ jsx("li", { children: "Map result sets to objects" }),
        /* @__PURE__ */ jsx("li", { children: "Close resources" })
      ] })
    ] })
  ] });
}
const SplitComponent = function IntroductionExample() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2", children: "1. Introduction: Bridging the Gap" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "This example demonstrates why React Query matters for Java developers transitioning to front-end, showing the difference between traditional state management and React Query." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "The Problem: Traditional Approach" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "In traditional React, managing server state requires manual handling of loading states, errors, and data caching. For Java developers, this is like manually writing JDBC code without using Hibernate or JPA." }),
      /* @__PURE__ */ jsx(TraditionalExample, {})
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "The Solution: React Query" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "React Query provides a powerful abstraction for managing server state, similar to how Hibernate/JPA abstracts database interactions in Java. It handles caching, loading states, and errors for you." }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4 bg-blue-50 p-3 rounded", children: [
        /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
        " Think of React Query as a state management framework similar to JPA/Hibernate in Java. It provides a caching layer, handles the lifecycle of data fetching, and abstracts away much of the boilerplate code."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "We'll look at a React Query implementation in the next example." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Key Benefits" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
        /* @__PURE__ */ jsx("li", { children: "Automatic loading & error states" }),
        /* @__PURE__ */ jsx("li", { children: "Built-in caching & stale-while-revalidate" }),
        /* @__PURE__ */ jsx("li", { children: "Automatic background refetching" }),
        /* @__PURE__ */ jsx("li", { children: "Pagination & infinite scrolling support" }),
        /* @__PURE__ */ jsx("li", { children: "Optimistic updates" }),
        /* @__PURE__ */ jsx("li", { children: "TypeScript integration (similar to strong typing in Java)" })
      ] })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=examples.introduction-4hd1a0eQ.mjs.map
