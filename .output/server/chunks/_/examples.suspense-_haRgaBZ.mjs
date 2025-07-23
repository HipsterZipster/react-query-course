import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Suspense } from 'react';
import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import { a as api } from './mock-api-BkHrhcok.mjs';

function TraditionalPosts() {
  var _a;
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => api.getPosts()
  });
  if (postsQuery.isPending) {
    return /* @__PURE__ */ jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2" }),
      /* @__PURE__ */ jsx("p", { children: "Loading posts..." })
    ] });
  }
  if (postsQuery.isError) {
    return /* @__PURE__ */ jsxs("div", { className: "p-6 bg-red-50 border border-red-200 rounded-lg", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-red-700 font-medium mb-2", children: "Error Loading Posts" }),
      /* @__PURE__ */ jsx("p", { className: "text-red-600", children: postsQuery.error instanceof Error ? postsQuery.error.message : "An unknown error occurred" })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "border rounded divide-y", children: (_a = postsQuery.data) == null ? void 0 : _a.map((post) => /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-medium", children: post.title }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
      post.content.substring(0, 100),
      "..."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-1 text-xs text-gray-500", children: [
      "Author ID: ",
      post.authorId,
      " | ",
      new Date(post.createdAt).toLocaleDateString()
    ] })
  ] }, post.id)) });
}
function SuspensePosts() {
  const {
    data
  } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: () => api.getPosts()
  });
  return /* @__PURE__ */ jsx("div", { className: "border rounded divide-y", children: data.map((post) => /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-medium", children: post.title }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
      post.content.substring(0, 100),
      "..."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-1 text-xs text-gray-500", children: [
      "Author ID: ",
      post.authorId,
      " | ",
      new Date(post.createdAt).toLocaleDateString()
    ] })
  ] }, post.id)) });
}
function LoadingFallback() {
  return /* @__PURE__ */ jsxs("div", { className: "p-8 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2" }),
    /* @__PURE__ */ jsx("p", { children: "Loading data with Suspense..." })
  ] });
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    var _a;
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { className: "p-6 bg-red-50 border border-red-200 rounded-lg", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-red-700 font-medium mb-2", children: "Something went wrong" }),
        /* @__PURE__ */ jsx("p", { className: "text-red-600", children: ((_a = this.state.error) == null ? void 0 : _a.message) || "An unknown error occurred" })
      ] });
    }
    return this.props.children;
  }
}
function BenefitItem({
  title,
  description
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "mt-1 mr-3 text-blue-500", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "8", x2: "12", y2: "8" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: description })
    ] })
  ] });
}
const SplitComponent = function SuspenseExample() {
  const [useSuspense, setUseSuspense] = React.useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2", children: "5. useSuspenseQuery and React Suspense" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Learn how to use React Suspense with TanStack Query for an even more declarative approach to data fetching." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Introduction to Suspense for Data Fetching" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'React Suspense allows components to "suspend" rendering while they wait for something to happen, such as data fetching. TanStack Query integrates with this pattern through useSuspenseQuery.' }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded mb-4", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Java Analogy" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Think of this as a declarative way to handle asynchronous operations, similar to how annotations can simplify configuration in Java frameworks like Spring or Jakarta EE. Instead of imperative error and loading handling, the framework takes care of it based on your declarative structure." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex rounded-md shadow-sm", role: "group", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setUseSuspense(false), className: `px-4 py-2 text-sm font-medium rounded-l-lg ${!useSuspense ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"} border border-gray-200`, children: "Traditional useQuery" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setUseSuspense(true), className: `px-4 py-2 text-sm font-medium rounded-r-lg ${useSuspense ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"} border border-gray-200`, children: "useSuspenseQuery" })
      ] }) }),
      useSuspense ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-4", children: "Suspense Example" }),
        /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-gray-600", children: "Notice how we don't need to handle loading states manually. React Suspense takes care of it." }),
        /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(LoadingFallback, {}), children: /* @__PURE__ */ jsx(SuspensePosts, {}) }) })
      ] }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-4", children: "Traditional Example" }),
        /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-gray-600", children: "With the traditional approach, we handle loading and error states manually." }),
        /* @__PURE__ */ jsx(TraditionalPosts, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Key Benefits of Suspense" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(BenefitItem, { title: "Declarative Loading States", description: "Define loading UI at the boundary level instead of in each component." }),
        /* @__PURE__ */ jsx(BenefitItem, { title: "Simplified Component Logic", description: "Components can focus on rendering data without handling loading states." }),
        /* @__PURE__ */ jsx(BenefitItem, { title: "Coordinated Loading States", description: "Multiple components can load data in parallel with a single loading state." }),
        /* @__PURE__ */ jsx(BenefitItem, { title: "Progressive Loading", description: "Nest Suspense boundaries to create progressive loading experiences." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Implementation Example" }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-800 text-white p-4 rounded overflow-x-auto mb-4", children: /* @__PURE__ */ jsx("pre", { children: `// Import necessary components
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
}` }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "When to Use Suspense vs. Traditional" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Use Suspense when:" }),
            " You want cleaner component code, coordinated loading states, or progressive loading experiences."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Use Traditional useQuery when:" }),
            " You need more granular control over loading states, or when you're working with older React versions."
          ] })
        ] })
      ] })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=examples.suspense-_haRgaBZ.mjs.map
