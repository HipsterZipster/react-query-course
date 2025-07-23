import * as React from 'react'
import { api, User } from '../../../api/mock-api'

export function ConditionalQueryVanilla(): React.ReactElement {
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false)
  const [userId, setUserId] = React.useState<number>(1)
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const fetchUser = async () => {
      if (!isEnabled) {
        setUser(null)
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        const data = await api.getUser(userId)
        setUser(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchUser()
  }, [userId, isEnabled])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <input
            id="enable-query-vanilla"
            type="checkbox"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor="enable-query-vanilla" className="ml-2 block text-sm">
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
        
        {isEnabled && isLoading && <p>Loading user...</p>}
        
        {isEnabled && error && (
          <p className="text-red-500">
            {error.message}
          </p>
        )}
        
        {isEnabled && user && (
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-gray-600">{user.email}</div>
          </div>
        )}
      </div>
    </div>
  )
}
