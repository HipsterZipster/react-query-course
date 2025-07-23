import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useQueries } from '@tanstack/react-query'
import { api, Post, User, useErrorToggle } from '../api/mock-api'

export const Route = createFileRoute('/examples/advanced-queries')({
  component: AdvancedQueriesExample,
})

/**
 * Advanced Querying Techniques - Demonstrating dynamic queries, conditional fetching, and TypeScript integration
 */
function AdvancedQueriesExample(): React.ReactElement {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">4. Advanced Querying Techniques</h1>
        <p className="text-gray-600">
          Learn advanced techniques like dynamic queries, conditional fetching, and managing multiple queries.
        </p>
      </header>

      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Dynamic Queries with Parameters</h2>
        <p className="mb-4">
          Similar to passing arguments to your DAO methods in Java, React Query allows you to create 
          dynamic queries by including parameters in the queryKey.
        </p>
        
        <DynamicQueryExample />
      </section>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Conditional Queries with enabled</h2>
        <p className="mb-4">
          Control when queries execute using the enabled option, similar to conditional checks in Java services.
        </p>
        
        <ConditionalQueryExample />
      </section>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">TypeScript Integration</h2>
        <p className="mb-4">
          React Query works seamlessly with TypeScript, providing strong typing for your queries and results.
        </p>
        
        <TypeScriptExample />
      </section>
      
      <section className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Multiple Queries</h2>
        <p className="mb-4">
          Handle multiple queries efficiently, either in parallel or as dependent queries.
        </p>
        
        <MultipleQueriesExample />
      </section>
    </div>
  )
}

/**
 * Example demonstrating dynamic queries with parameters
 */
function DynamicQueryExample(): React.ReactElement {
  const [userId, setUserId] = React.useState<number>(1)
  
  // Dynamic query using the selected userId
  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
  })
  
  // React Query automatically handles refetching when dependencies (userId) change
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Select User ID:</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((id) => (
            <button
              key={id}
              onClick={() => setUserId(id)}
              className={`px-3 py-1 rounded ${userId === id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
      
      <div className="border rounded p-4 bg-gray-50">
        <h3 className="font-medium mb-2">Dynamic Query Result</h3>
        
        {userQuery.isPending && <p>Loading user...</p>}
        
        {userQuery.isError && (
          <p className="text-red-500">
            {userQuery.error instanceof Error 
              ? userQuery.error.message 
              : 'An error occurred'}
          </p>
        )}
        
        {userQuery.data && (
          <div>
            <div className="font-medium">{userQuery.data.name}</div>
            <div className="text-gray-600">{userQuery.data.email}</div>
            <div className="mt-1 text-xs bg-blue-100 rounded-full px-2 py-1 inline-block">
              {userQuery.data.role}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 p-3 rounded text-sm">
        <p><strong>Java Analogy:</strong> This is similar to calling a DAO method with different parameters:</p>
        <pre className="bg-blue-100 p-2 mt-1 rounded text-xs">userRepository.findById(userId);</pre>
        <p className="mt-1">
          The key difference is that React Query automatically caches each result by its queryKey.
        </p>
      </div>
    </div>
  )
}

/**
 * Example demonstrating conditional queries using the enabled option
 */
function ConditionalQueryExample(): React.ReactElement {
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false)
  const [userId, setUserId] = React.useState<number>(1)
  
  // Conditional query that only runs when isEnabled is true
  const userQuery = useQuery({
    queryKey: ['conditional-user', userId],
    queryFn: () => api.getUser(userId),
    enabled: isEnabled, // Only fetch when this is true
  })
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <input
            id="enable-query"
            type="checkbox"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor="enable-query" className="ml-2 block text-sm">
            Enable Query
          </label>
        </div>
        
        {isEnabled && (
          <div className="flex gap-2">
            {[1, 2, 3].map((id) => (
              <button
                key={id}
                onClick={() => setUserId(id)}
                className={`px-3 py-1 rounded ${userId === id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                User {id}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="border rounded p-4 bg-gray-50">
        <h3 className="font-medium mb-2">Conditional Query Status</h3>
        
        {!isEnabled && (
          <p className="text-gray-500">Query disabled. Enable the query to fetch data.</p>
        )}
        
        {isEnabled && userQuery.isPending && <p>Loading user...</p>}
        
        {isEnabled && userQuery.isError && (
          <p className="text-red-500">
            {userQuery.error instanceof Error 
              ? userQuery.error.message 
              : 'An error occurred'}
          </p>
        )}
        
        {isEnabled && userQuery.data && (
          <div>
            <div className="font-medium">{userQuery.data.name}</div>
            <div className="text-gray-600">{userQuery.data.email}</div>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 p-3 rounded text-sm">
        <p><strong>Java Analogy:</strong> This is like conditionally executing a method in Java:</p>
        <pre className="bg-blue-100 p-2 mt-1 rounded text-xs">
{`if (shouldFetchUser) {
  User user = userRepository.findById(userId);
  // Do something with user
}`}
        </pre>
      </div>
    </div>
  )
}

/**
 * Example demonstrating TypeScript integration with React Query
 */
function TypeScriptExample(): React.ReactElement {
  return (
    <div className="space-y-4">
      <p>
        React Query provides excellent TypeScript support, allowing you to define types for your query results.
      </p>
      
      <div className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
        <pre>
{`// Define your types
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
const userName = userQuery.data?.name; // Fully typed!`}
        </pre>
      </div>
      
      <div className="bg-blue-50 p-3 rounded text-sm">
        <p><strong>Java Analogy:</strong> This is similar to Java's strong typing and generics:</p>
        <pre className="bg-blue-100 p-2 mt-1 rounded text-xs">
{`// Java equivalent using generics
Optional<User> user = userRepository.findById(userId);
String userName = user.map(User::getName).orElse(null);`}
        </pre>
      </div>
    </div>
  )
}

/**
 * Example demonstrating parallel and dependent queries
 */
function MultipleQueriesExample(): React.ReactElement {
  const [authorId, setAuthorId] = React.useState<number>(1)
  
  // First query to get author information
  const authorQuery = useQuery({
    queryKey: ['author', authorId],
    queryFn: () => api.getUser(authorId),
  })
  
  // Dependent query - only runs when authorQuery completes successfully
  const authorPostsQuery = useQuery({
    queryKey: ['author-posts', authorId],
    queryFn: () => api.getPostsByAuthor(authorId),
    enabled: !!authorQuery.data, // Only run this query when author data is available
  })
  
  // Parallel queries example using useQueries
  const postQueries = useQueries({
    queries: [1, 2, 3].map((postId) => {
      return {
        queryKey: ['post', postId],
        queryFn: () => api.getPost(postId),
      }
    }),
  })
  
  const allPostsLoaded = postQueries.every((query) => query.isSuccess)
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Dependent Queries Example</h3>
        <p className="text-sm text-gray-600 mb-3">
          The second query only runs after the first one completes successfully.
        </p>
        
        <div className="flex gap-2 mb-3">
          {[1, 2, 3, 4].map((id) => (
            <button
              key={id}
              onClick={() => setAuthorId(id)}
              className={`px-3 py-1 rounded ${authorId === id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              Author {id}
            </button>
          ))}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border p-3 rounded bg-gray-50">
            <h4 className="font-medium mb-2">Author Query</h4>
            {authorQuery.isPending && <p className="text-sm">Loading author...</p>}
            {authorQuery.isError && (
              <p className="text-sm text-red-500">Error loading author</p>
            )}
            {authorQuery.data && (
              <div>
                <div className="font-medium">{authorQuery.data.name}</div>
                <div className="text-sm text-gray-600">{authorQuery.data.email}</div>
              </div>
            )}
          </div>
          
          <div className="border p-3 rounded bg-gray-50">
            <h4 className="font-medium mb-2">Author's Posts Query</h4>
            {!authorQuery.data && <p className="text-sm text-gray-500">Waiting for author data...</p>}
            {authorQuery.data && authorPostsQuery.isPending && (
              <p className="text-sm">Loading posts...</p>
            )}
            {authorPostsQuery.isError && (
              <p className="text-sm text-red-500">Error loading posts</p>
            )}
            {authorPostsQuery.data && (
              <div>
                <p className="text-sm">{authorPostsQuery.data.length} posts found</p>
                <ul className="text-sm mt-1 space-y-1">
                  {authorPostsQuery.data.map((post) => (
                    <li key={post.id} className="truncate">• {post.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded text-sm mt-2">
          <p><strong>Java Analogy:</strong> Like a service method that loads related entities:</p>
          <pre className="bg-blue-100 p-2 mt-1 rounded text-xs">
{`User author = userRepository.findById(authorId);
if (author != null) {
  List<Post> posts = postRepository.findByAuthorId(author.getId());
}`}
          </pre>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Parallel Queries Example</h3>
        <p className="text-sm text-gray-600 mb-3">
          Multiple queries run in parallel using useQueries.
        </p>
        
        <div className="border p-3 rounded bg-gray-50">
          <h4 className="font-medium mb-2">Multiple Post Queries</h4>
          {!allPostsLoaded && <p className="text-sm">Loading posts in parallel...</p>}
          
          <div className="grid gap-2 md:grid-cols-3 mt-2">
            {postQueries.map((query, index) => (
              <div key={index} className="p-2 border rounded">
                {query.isPending && <p className="text-xs">Loading...</p>}
                {query.isError && <p className="text-xs text-red-500">Error!</p>}
                {query.data && (
                  <div className="text-sm">
                    <div className="font-medium truncate">{query.data.title}</div>
                    <div className="text-xs text-gray-500">ID: {query.data.id}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded text-sm mt-2">
          <p><strong>Java Analogy:</strong> Similar to CompletableFuture.allOf() in Java:</p>
          <pre className="bg-blue-100 p-2 mt-1 rounded text-xs">
{`CompletableFuture<Post> post1 = CompletableFuture.supplyAsync(() -> postRepository.findById(1L));
CompletableFuture<Post> post2 = CompletableFuture.supplyAsync(() -> postRepository.findById(2L));
CompletableFuture<Post> post3 = CompletableFuture.supplyAsync(() -> postRepository.findById(3L));

CompletableFuture.allOf(post1, post2, post3).join(); // Wait for all to complete`}
          </pre>
        </div>
      </div>
    </div>
  )
}
