import * as React from 'react'
import { api, User } from '../../../api/mock-api'

export function UserListVanilla({ shouldError }: { readonly shouldError: boolean }): React.ReactElement {
  const [users, setUsers] = React.useState<User[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  const fetchUsers = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await api.getUsers(shouldError)
      setUsers([...data])
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [shouldError])

  React.useEffect(() => {
    void fetchUsers()
  }, [fetchUsers])

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
        <p>Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-700 font-medium mb-2">Error Loading Users</h3>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button 
          onClick={() => fetchUsers()} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">User List</h3>
        <button 
          onClick={() => fetchUsers()} 
          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm"
        >
          Refetch
        </button>
      </div>
      
      <ul className="divide-y border rounded">
        {users.map(user => (
          <li key={user.id} className="p-3 hover:bg-gray-50">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <div className="text-xs mt-1 inline-block px-2 py-1 bg-gray-100 rounded-full">
              {user.role}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
