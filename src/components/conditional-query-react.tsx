import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/mock-api'

export function ConditionalQueryReact(): React.ReactElement {
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false)
  const [userId, setUserId] = React.useState<number>(1)
  
  const userQuery = useQuery({
    queryKey: ['conditional-user', userId],
    queryFn: () => api.getUser(userId),
    enabled: isEnabled,
  })
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <input
            id="enable-query-react"
            type="checkbox"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor="enable-query-react" className="ml-2 block text-sm">
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
    </div>
  )
}
