import * as React from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import { api } from '../api/mock-api'

export function MultipleQueriesReact(): React.ReactElement {
  const [authorId, setAuthorId] = React.useState<number>(1)
  
  const authorQuery = useQuery({
    queryKey: ['author', authorId],
    queryFn: () => api.getUser(authorId),
  })
  
  const authorPostsQuery = useQuery({
    queryKey: ['author-posts', authorId],
    queryFn: () => api.getPostsByAuthor(authorId),
    enabled: !!authorQuery.data,
  })
  
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
            {authorQuery.isError && <p className="text-sm text-red-500">Error loading author</p>}
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
            {authorPostsQuery.isError && <p className="text-sm text-red-500">Error loading posts</p>}
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
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Parallel Queries Example</h3>
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
      </div>
    </div>
  )
}
