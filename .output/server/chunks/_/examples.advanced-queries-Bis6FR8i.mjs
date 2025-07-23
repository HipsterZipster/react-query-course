import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { a as api } from './mock-api-BkHrhcok.mjs';

function DynamicQueryExample() {
  const [userId, setUserId] = React.useState(1);
  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.getUser(userId)
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2", children: "Select User ID:" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4, 5].map((id) => /* @__PURE__ */ jsx("button", { onClick: () => setUserId(id), className: `px-3 py-1 rounded ${userId === id ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`, children: id }, id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border rounded p-4 bg-gray-50", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Dynamic Query Result" }),
      userQuery.isPending && /* @__PURE__ */ jsx("p", { children: "Loading user..." }),
      userQuery.isError && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: userQuery.error instanceof Error ? userQuery.error.message : "An error occurred" }),
      userQuery.data && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-medium", children: userQuery.data.name }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: userQuery.data.email }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs bg-blue-100 rounded-full px-2 py-1 inline-block", children: userQuery.data.role })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-3 rounded text-sm", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
        " This is similar to calling a DAO method with different parameters:"
      ] }),
      /* @__PURE__ */ jsx("pre", { className: "bg-blue-100 p-2 mt-1 rounded text-xs", children: "userRepository.findById(userId);" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1", children: "The key difference is that React Query automatically caches each result by its queryKey." })
    ] })
  ] });
}
function ConditionalQueryExample() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [userId, setUserId] = React.useState(1);
  const userQuery = useQuery({
    queryKey: ["conditional-user", userId],
    queryFn: () => api.getUser(userId),
    enabled: isEnabled
    // Only fetch when this is true
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("input", { id: "enable-query", type: "checkbox", checked: isEnabled, onChange: () => setIsEnabled(!isEnabled), className: "h-4 w-4 rounded border-gray-300 text-blue-600" }),
        /* @__PURE__ */ jsx("label", { htmlFor: "enable-query", className: "ml-2 block text-sm", children: "Enable Query" })
      ] }),
      isEnabled && /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [1, 2, 3].map((id) => /* @__PURE__ */ jsxs("button", { onClick: () => setUserId(id), className: `px-3 py-1 rounded ${userId === id ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`, children: [
        "User ",
        id
      ] }, id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border rounded p-4 bg-gray-50", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Conditional Query Status" }),
      !isEnabled && /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Query disabled. Enable the query to fetch data." }),
      isEnabled && userQuery.isPending && /* @__PURE__ */ jsx("p", { children: "Loading user..." }),
      isEnabled && userQuery.isError && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: userQuery.error instanceof Error ? userQuery.error.message : "An error occurred" }),
      isEnabled && userQuery.data && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-medium", children: userQuery.data.name }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: userQuery.data.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-3 rounded text-sm", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
        " This is like conditionally executing a method in Java:"
      ] }),
      /* @__PURE__ */ jsx("pre", { className: "bg-blue-100 p-2 mt-1 rounded text-xs", children: `if (shouldFetchUser) {
  User user = userRepository.findById(userId);
  // Do something with user
}` })
    ] })
  ] });
}
function TypeScriptExample() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("p", { children: "React Query provides excellent TypeScript support, allowing you to define types for your query results." }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-800 text-white p-4 rounded overflow-x-auto", children: /* @__PURE__ */ jsx("pre", { children: `// Define your types
interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: string;
}

// Type-safe query
const userQuery = useQuery<User, Error>({
  queryKey: ['user', userId],
  queryFn: () => api.getUser(userId),
})

// TypeScript now knows the shape of userQuery.data
const userName = userQuery.data?.name; // Fully typed!` }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-3 rounded text-sm", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
        " This is similar to Java's strong typing and generics:"
      ] }),
      /* @__PURE__ */ jsx("pre", { className: "bg-blue-100 p-2 mt-1 rounded text-xs", children: `// Java equivalent using generics
Optional<User> user = userRepository.findById(userId);
String userName = user.map(User::getName).orElse(null);` })
    ] })
  ] });
}
function MultipleQueriesExample() {
  const [authorId, setAuthorId] = React.useState(1);
  const authorQuery = useQuery({
    queryKey: ["author", authorId],
    queryFn: () => api.getUser(authorId)
  });
  const authorPostsQuery = useQuery({
    queryKey: ["author-posts", authorId],
    queryFn: () => api.getPostsByAuthor(authorId),
    enabled: !!authorQuery.data
    // Only run this query when author data is available
  });
  const postQueries = useQueries({
    queries: [1, 2, 3].map((postId) => {
      return {
        queryKey: ["post", postId],
        queryFn: () => api.getPost(postId)
      };
    })
  });
  const allPostsLoaded = postQueries.every((query) => query.isSuccess);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Dependent Queries Example" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3", children: "The second query only runs after the first one completes successfully." }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 mb-3", children: [1, 2, 3, 4].map((id) => /* @__PURE__ */ jsxs("button", { onClick: () => setAuthorId(id), className: `px-3 py-1 rounded ${authorId === id ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`, children: [
        "Author ",
        id
      ] }, id)) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "border p-3 rounded bg-gray-50", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Author Query" }),
          authorQuery.isPending && /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Loading author..." }),
          authorQuery.isError && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: "Error loading author" }),
          authorQuery.data && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: authorQuery.data.name }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: authorQuery.data.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border p-3 rounded bg-gray-50", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Author's Posts Query" }),
          !authorQuery.data && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Waiting for author data..." }),
          authorQuery.data && authorPostsQuery.isPending && /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Loading posts..." }),
          authorPostsQuery.isError && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: "Error loading posts" }),
          authorPostsQuery.data && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
              authorPostsQuery.data.length,
              " posts found"
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "text-sm mt-1 space-y-1", children: authorPostsQuery.data.map((post) => /* @__PURE__ */ jsxs("li", { className: "truncate", children: [
              "\u2022 ",
              post.title
            ] }, post.id)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-3 rounded text-sm mt-2", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
          " Like a service method that loads related entities:"
        ] }),
        /* @__PURE__ */ jsx("pre", { className: "bg-blue-100 p-2 mt-1 rounded text-xs", children: `User author = userRepository.findById(authorId);
if (author != null) {
  List<Post> posts = postRepository.findByAuthorId(author.getId());
}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Parallel Queries Example" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Multiple queries run in parallel using useQueries." }),
      /* @__PURE__ */ jsxs("div", { className: "border p-3 rounded bg-gray-50", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Multiple Post Queries" }),
        !allPostsLoaded && /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Loading posts in parallel..." }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-2 md:grid-cols-3 mt-2", children: postQueries.map((query, index) => /* @__PURE__ */ jsxs("div", { className: "p-2 border rounded", children: [
          query.isPending && /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Loading..." }),
          query.isError && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: "Error!" }),
          query.data && /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium truncate", children: query.data.title }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
              "ID: ",
              query.data.id
            ] })
          ] })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-3 rounded text-sm mt-2", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Java Analogy:" }),
          " Similar to CompletableFuture.allOf() in Java:"
        ] }),
        /* @__PURE__ */ jsx("pre", { className: "bg-blue-100 p-2 mt-1 rounded text-xs", children: `CompletableFuture<Post> post1 = CompletableFuture.supplyAsync(() -> postRepository.findById(1L));
CompletableFuture<Post> post2 = CompletableFuture.supplyAsync(() -> postRepository.findById(2L));
CompletableFuture<Post> post3 = CompletableFuture.supplyAsync(() -> postRepository.findById(3L));

CompletableFuture.allOf(post1, post2, post3).join(); // Wait for all to complete` })
      ] })
    ] })
  ] });
}
const SplitComponent = function AdvancedQueriesExample() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2", children: "4. Advanced Querying Techniques" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Learn advanced techniques like dynamic queries, conditional fetching, and managing multiple queries." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Dynamic Queries with Parameters" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Similar to passing arguments to your DAO methods in Java, React Query allows you to create dynamic queries by including parameters in the queryKey." }),
      /* @__PURE__ */ jsx(DynamicQueryExample, {})
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Conditional Queries with enabled" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Control when queries execute using the enabled option, similar to conditional checks in Java services." }),
      /* @__PURE__ */ jsx(ConditionalQueryExample, {})
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "TypeScript Integration" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "React Query works seamlessly with TypeScript, providing strong typing for your queries and results." }),
      /* @__PURE__ */ jsx(TypeScriptExample, {})
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white p-6 border rounded-lg", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Multiple Queries" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Handle multiple queries efficiently, either in parallel or as dependent queries." }),
      /* @__PURE__ */ jsx(MultipleQueriesExample, {})
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=examples.advanced-queries-Bis6FR8i.mjs.map
