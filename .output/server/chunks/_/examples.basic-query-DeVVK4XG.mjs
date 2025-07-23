import { jsxs, jsx } from 'react/jsx-runtime';
import { useQuery } from '@tanstack/react-query';
import { u as useErrorToggle, a as api } from './mock-api-BkHrhcok.mjs';
import 'react';

function UserListWithQuery({
  shouldError
}) {
  const usersQuery = useQuery({
    queryKey: ["users", {
      error: shouldError
    }],
    queryFn: () => api.getUsers(shouldError)
  });
  const {
    data,
    isPending,
    isError,
    error,
    refetch
  } = usersQuery;
  if (isPending) {
    return /* @__PURE__ */ jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2" }),
      /* @__PURE__ */ jsx("p", { children: "Loading users..." })
    ] });
  }
  if (isError) {
    return /* @__PURE__ */ jsxs("div", { className: "p-6 bg-red-50 border border-red-200 rounded-lg", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-red-700 font-medium mb-2", children: "Error Loading Users" }),
      /* @__PURE__ */ jsx("p", { className: "text-red-600 mb-4", children: error instanceof Error ? error.message : "An unknown error occurred" }),
      /* @__PURE__ */ jsx("button", { onClick: () => refetch(), className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700", children: "Try Again" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "User List" }),
      /* @__PURE__ */ jsx("button", { onClick: () => refetch(), className: "px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm", children: "Refetch" })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "divide-y border rounded", children: data == null ? void 0 : data.map((user) => /* @__PURE__ */ jsxs("li", { className: "p-3 hover:bg-gray-50", children: [
      /* @__PURE__ */ jsx("div", { className: "font-medium", children: user.name }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: user.email }),
      /* @__PURE__ */ jsx("div", { className: "text-xs mt-1 inline-block px-2 py-1 bg-gray-100 rounded-full", children: user.role })
    ] }, user.id)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-blue-50 rounded text-sm", children: /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Note:" }),
      " The query results are cached. Try navigating away and coming back - the data will be instantly available while a background refetch occurs."
    ] }) })
  ] });
}
function QueryResultItem({
  name,
  description,
  javaAnalogy
}) {
  return /* @__PURE__ */ jsxs("div", { className: "border rounded p-4", children: [
    /* @__PURE__ */ jsx("code", { className: "bg-gray-100 px-1 font-medium", children: name }),
    /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", children: description }),
    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs bg-blue-50 p-2 rounded", children: [
      /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
      " ",
      javaAnalogy
    ] })
  ] });
}
function BenefitItem({
  title,
  description
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "mt-1 mr-3 text-green-500", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
      /* @__PURE__ */ jsx("polyline", { points: "22 4 12 14.01 9 11.01" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: description })
    ] })
  ] });
}
const SplitComponent = function BasicQueryExample() {
  const [shouldError, toggleError] = useErrorToggle();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2", children: "3. The useQuery Hook: Your New Best Friend" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Learn the core concepts of querying data with React Query's useQuery hook." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Core Concepts" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-l-4 border-blue-500 bg-blue-50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "queryKey" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: "A unique identifier for your data. Similar to a primary key in a database or a key in a HashMap." }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs bg-blue-100 p-2 rounded", children: [
            /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
            " Like a unique identifier in a Java Map or database primary key."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-l-4 border-green-500 bg-green-50", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "queryFn" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: "The asynchronous function that fetches your data (e.g., using fetch or axios)." }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs bg-green-100 p-2 rounded", children: [
            /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
            " This is like your DAO or Repository method that retrieves data from a database."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "Basic useQuery Example" }),
        /* @__PURE__ */ jsx("pre", { className: "bg-gray-800 text-white p-4 rounded overflow-x-auto", children: /* @__PURE__ */ jsx("code", { children: `const { data, isPending, isError, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
})` }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Live Example: User List" }),
        /* @__PURE__ */ jsx("button", { onClick: toggleError, className: "px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded text-sm", children: "Toggle Error State" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "This example uses React Query to fetch a list of users. Notice how loading, error states, and data are automatically handled for you." }),
      /* @__PURE__ */ jsx(UserListWithQuery, { shouldError })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "What You Get Back" }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsx(QueryResultItem, { name: "data", description: "The successful response payload from your API.", javaAnalogy: "Like the entity objects returned from a JPA repository method." }),
        /* @__PURE__ */ jsx(QueryResultItem, { name: "isPending", description: "Boolean indicating if the query is in a loading state.", javaAnalogy: "Like checking if a Future or CompletableFuture is done in Java." }),
        /* @__PURE__ */ jsx(QueryResultItem, { name: "isError", description: "Boolean indicating if the query encountered an error.", javaAnalogy: "Similar to catching exceptions in a try-catch block." }),
        /* @__PURE__ */ jsx(QueryResultItem, { name: "error", description: "The error object thrown by queryFn if the query failed.", javaAnalogy: "Like the Exception object in a Java catch block." }),
        /* @__PURE__ */ jsx(QueryResultItem, { name: "refetch", description: "Function to manually trigger a refetch of the query data.", javaAnalogy: "Like explicitly calling a refresh method on a data source in Java." }),
        /* @__PURE__ */ jsx(QueryResultItem, { name: "isFetching", description: "Boolean indicating if the query is currently fetching data (including background refetching).", javaAnalogy: "Similar to checking if a background task is running in Java." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Key Benefits Over Traditional Approach" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(BenefitItem, { title: "Automatic Loading & Error States", description: "No more manual flags and error state management." }),
        /* @__PURE__ */ jsx(BenefitItem, { title: "Caching", description: "Results are cached by queryKey and reused across components." }),
        /* @__PURE__ */ jsx(BenefitItem, { title: "Automatic Refetching", description: "Data is automatically kept fresh based on your configuration." }),
        /* @__PURE__ */ jsx(BenefitItem, { title: "Shared Query Results", description: "Multiple components can use the same data without duplicate requests." }),
        /* @__PURE__ */ jsx(BenefitItem, { title: "TypeScript Integration", description: "Full type safety for your queries and results." })
      ] })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=examples.basic-query-DeVVK4XG.mjs.map
