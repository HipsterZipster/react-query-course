import * as React from 'react'
import { api, Post, User } from '../api/mock-api'

export function MultipleQueriesVanilla(): React.ReactElement {
  // Dependent queries state
  const [authorId, setAuthorId] = React.useState<number>(1)
  const [author, setAuthor] = React.useState<User | null>(null)
  const [authorPosts, setAuthorPosts] = React.useState<Post[] | null>(null)
  const [isAuthorLoading, setIsAuthorLoading] = React.useState(true)
  const [authorError, setAuthorError] = React.useState<Error | null>(null)
  const [isPostsLoading, setIsPostsLoading] = React.useState(false)
  const [postsError, setPostsError] = React.useState<Error | null>(null)

  // Parallel queries state
  const [posts, setPosts] = React.useState<(Post | null)[]>([])
  const [arePostsLoading, setArePostsLoading] = React.useState(true)

  // Effect for dependent queries
  React.useEffect(() => {
    const fetchAuthor = async () => {
      setIsAuthorLoading(true)
      setAuthorError(null)
      setAuthorPosts(null) // Reset posts when author changes
      try {
        const data = await api.getUser(authorId)
        setAuthor(data)
      } catch (err) {
        setAuthorError(err as Error)
        setAuthor(null)
      } finally {
        setIsAuthorLoading(false)
      }
    }
    void fetchAuthor()
  }, [authorId])

  React.useEffect(() => {
    if (!author) return

    const fetchPosts = async () => {
      setIsPostsLoading(true)
      setPostsError(null)
      try {
        const data = await api.getPostsByAuthor(author.id)
        setAuthorPosts([...data])
      } catch (err) {
        setPostsError(err as Error)
      } finally {
        setIsPostsLoading(false)
      }
    }
    void fetchPosts()
  }, [author])

  // Effect for parallel queries
  React.useEffect(() => {
    const fetchAllPosts = async () => {
      setArePostsLoading(true)
      try {
        const postPromises = [1, 2, 3].map(id => api.getPost(id))
        const results = await Promise.all(postPromises)
        setPosts(results)
      } catch (error) {
        console.error('Failed to fetch posts in parallel', error)
        setPosts([])
      } finally {
        setArePostsLoading(false)
      }
    }
    void fetchAllPosts()
  }, [])

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
            {isAuthorLoading && <p className="text-sm">Loading author...</p>}
            {authorError && <p className="text-sm text-red-500">Error loading author</p>}
            {author && (
              <div>
                <div className="font-medium">{author.name}</div>
                <div className="text-sm text-gray-600">{author.email}</div>
              </div>
            )}
          </div>
          <div className="border p-3 rounded bg-gray-50">
            <h4 className="font-medium mb-2">Author's Posts Query</h4>
            {!author && !isAuthorLoading && <p className="text-sm text-gray-500">Waiting for author data...</p>}
            {isPostsLoading && <p className="text-sm">Loading posts...</p>}
            {postsError && <p className="text-sm text-red-500">Error loading posts</p>}
            {authorPosts && (
              <div>
                <p className="text-sm">{authorPosts.length} posts found</p>
                <ul className="text-sm mt-1 space-y-1">
                  {authorPosts.map((post) => (
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
          {arePostsLoading && <p className="text-sm">Loading posts in parallel...</p>}
          <div className="grid gap-2 md:grid-cols-3 mt-2">
            {posts.map((post, index) => (
              <div key={index} className="p-2 border rounded">
                {post ? (
                  <div className="text-sm">
                    <div className="font-medium truncate">{post.title}</div>
                    <div className="text-xs text-gray-500">ID: {post.id}</div>
                  </div>
                ) : (
                  <p className="text-xs text-red-500">Error!</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
