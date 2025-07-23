import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/mock-api'

export function DynamicQueryReact(): React.ReactElement {
  const [userId, setUserId] = React.useState<number>(1)
  
  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
  })
  
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
    </div>
  )
}
