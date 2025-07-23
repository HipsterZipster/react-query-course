import * as React from 'react'
import { api, Post } from '../../../api/mock-api'

export function SuspenseVanilla(): React.ReactElement {
  const [posts, setPosts] = React.useState<Post[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await api.getPosts()
        setPosts([...data])
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }
    void fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-700 font-medium mb-2">Error Loading Posts</h3>
        <p className="text-red-600">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="border rounded divide-y">
      {posts.map((post) => (
        <div key={post.id} className="p-3">
          <h3 className="font-medium">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.content.substring(0, 100)}...</p>
          <div className="mt-1 text-xs text-gray-500">
            Author ID: {post.authorId} | {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}
