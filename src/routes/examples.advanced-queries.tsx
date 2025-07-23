import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useQueries } from '@tanstack/react-query'
import { api, Post, User, useErrorToggle } from '../api/mock-api'
import { DynamicQueryVanilla } from '../components/dynamic-query-vanilla'
import { angularComponentCode as dynamicAngularComponent, angularTemplateCode as dynamicAngularTemplate } from '../components/dynamic-query-angular'
import { DynamicQueryReact } from '../components/dynamic-query-react'
import { ConditionalQueryVanilla } from '../components/conditional-query-vanilla'
import { angularComponentCode as conditionalAngularComponent, angularTemplateCode as conditionalAngularTemplate } from '../components/conditional-query-angular'
import { ConditionalQueryReact } from '../components/conditional-query-react'
import { MultipleQueriesVanilla } from '../components/multiple-queries-vanilla'
import { angularComponentCode as multipleAngularComponent, angularTemplateCode as multipleAngularTemplate } from '../components/multiple-queries-angular'
import { MultipleQueriesReact } from '../components/multiple-queries-react'
import { CodeExample } from '../components/code-example'

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

      <CodeExample 
        title="Dynamic Queries with Parameters"
        code={[
          { 
            name: "React Query", 
            code: `import { useQuery } from '@tanstack/react-query';
import { api } from '../api/mock-api';

function DynamicQueryExample({ userId }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.email}</p>
    </div>
  );
}`,
            language: "typescript"
          },
          { 
            name: "Vanilla JS", 
            code: `import { useState, useEffect } from 'react';
import { api } from '../api/mock-api';

function DynamicQueryVanilla({ userId }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api.getUser(userId)
      .then(userData => {
        setData(userData);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.email}</p>
    </div>
  );
}`,
            language: "typescript"
          },
          { 
            name: "Angular", 
            code: dynamicAngularComponent + '\n\n' + dynamicAngularTemplate,
            language: "typescript"
          }
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Similar to passing arguments to your DAO methods in Java, React Query allows you to create 
            dynamic queries by including parameters in the queryKey.
          </p>
          <DynamicQueryReact />
        </div>
      </CodeExample>
      
      <CodeExample 
        title="Conditional Queries with enabled"
        code={[
          { 
            name: "React Query", 
            code: `import { useQuery } from '@tanstack/react-query';
import { api } from '../api/mock-api';

function ConditionalQueryExample({ userId, enabled }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
    enabled: !!userId && enabled,
  });

  if (!enabled) return <div>Query disabled</div>;
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.email}</p>
    </div>
  );
}`,
            language: "typescript"
          },
          { 
            name: "Vanilla JS", 
            code: `import { useState, useEffect } from 'react';
import { api } from '../api/mock-api';

function ConditionalQueryVanilla({ userId, enabled }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !enabled) return;
    
    setIsLoading(true);
    api.getUser(userId)
      .then(userData => {
        setData(userData);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [userId, enabled]);

  if (!enabled) return <div>Query disabled</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>{data?.name}</h3>
      <p>{data?.email}</p>
    </div>
  );
}`,
            language: "typescript"
          },
          { 
            name: "Angular", 
            code: conditionalAngularComponent + '\n\n' + conditionalAngularTemplate,
            language: "typescript"
          }
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Control when queries run using the enabled option. This is useful for dependent queries or user-controlled fetching.
          </p>
          <ConditionalQueryReact />
        </div>
      </CodeExample>
      
      <CodeExample 
        title="TypeScript Integration"
        code={[
          { 
            name: "React Query", 
            code: `import { useQuery } from '@tanstack/react-query';
import { api } from '../api/mock-api';

// Define your types
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

function TypedQueryExample() {
  // TypeScript automatically infers the return type
  const { data, isPending, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => api.getUsers(),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}`,
            language: "typescript"
          },
          { 
            name: "Type Definitions", 
            code: `// Type definitions
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
}

// API client with typed methods
const api = {
  getUsers: (): Promise<User[]> => {
    return fetch('/api/users').then(res => res.json());
  },
  getUser: (id: number): Promise<User> => {
    return fetch(\`/api/users/\${id}\`).then(res => res.json());
  },
  getPosts: (): Promise<Post[]> => {
    return fetch('/api/posts').then(res => res.json());
  }
};`,
            language: "typescript"
          }
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            React Query works seamlessly with TypeScript, providing strong typing for your queries and results.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-2">Benefits of TypeScript with React Query:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Strongly typed query results</li>
              <li>Autocomplete for query options</li>
              <li>Type checking for query keys</li>
              <li>Error handling with proper types</li>
            </ul>
          </div>
        </div>
      </CodeExample>
      
      <CodeExample 
        title="Multiple Queries"
        code={[
          { 
            name: "React Query", 
            code: `import { useQuery } from '@tanstack/react-query';
import { api } from '../api/mock-api';

function MultipleQueriesExample() {
  // Parallel queries
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUsers(),
  });
  
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.getPosts(),
  });

  // Dependent query - only runs when usersQuery succeeds
  const firstUserPostsQuery = useQuery({
    queryKey: ['posts', usersQuery.data?.[0]?.id],
    queryFn: () => api.getUserPosts(usersQuery.data[0].id),
    enabled: !!usersQuery.data?.[0]?.id,
  });

  if (usersQuery.isPending || postsQuery.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Users: {usersQuery.data?.length}</h3>
      <h3>Posts: {postsQuery.data?.length}</h3>
      {firstUserPostsQuery.isPending ? (
        <p>Loading first user's posts...</p>
      ) : (
        <p>First user's posts: {firstUserPostsQuery.data?.length}</p>
      )}
    </div>
  );
}`,
            language: "typescript"
          },
          { 
            name: "useQueries", 
            code: `import { useQueries } from '@tanstack/react-query';
import { api } from '../api/mock-api';

function DynamicParallelQueries({ userIds }) {
  // Dynamic parallel queries
  const userQueries = useQueries({
    queries: userIds.map(id => ({
      queryKey: ['user', id],
      queryFn: () => api.getUser(id),
    })),
  });

  const isLoading = userQueries.some(query => query.isPending);
  const isError = userQueries.some(query => query.isError);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  return (
    <div>
      <h3>Users:</h3>
      <ul>
        {userQueries.map((query, index) => (
          <li key={userIds[index]}>{query.data?.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
            language: "typescript"
          },
          { 
            name: "Angular", 
            code: multipleAngularComponent + '\n\n' + multipleAngularTemplate,
            language: "typescript"
          }
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Handle multiple queries efficiently, either in parallel or as dependent queries.
          </p>
          <MultipleQueriesReact />
        </div>
      </CodeExample>
    </div>
  )
}
