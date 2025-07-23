export const userListReactQueryCode = `
import { useQuery } from '@tanstack/react-query';
import { api, User } from '../api/mock-api';

function UserListWithQuery({ shouldError }: { readonly shouldError: boolean }): React.ReactElement {
  // useQuery hook handles data fetching, loading states, and caching automatically
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['users', { error: shouldError }], // Unique identifier for this query
    queryFn: () => api.getUsers(shouldError), // Function that returns a Promise
  })
  
  // React Query automatically provides loading state
  if (isPending) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
        <p>Loading users...</p>
      </div>
    )
  }
  
  // React Query automatically catches and provides error state
  if (isError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-700 font-medium mb-2">Error Loading Users</h3>
        <p className="text-red-600 mb-4">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
        <button 
          onClick={() => refetch()} // Built-in refetch function for retry logic
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }
  
  // Success state - data is automatically typed and available
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">User List</h3>
        <button 
          onClick={() => refetch()} // Manually trigger a fresh fetch
          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm"
        >
          Refetch
        </button>
      </div>
      
      <ul className="divide-y border rounded">
        {data?.map(user => ( // Optional chaining since data might be undefined
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
`;

export const userListVanillaCode = `
import React from 'react';
import { api, User } from '../api/mock-api';

export function UserListVanilla({ shouldError }: { readonly shouldError: boolean }): React.ReactElement {
  // Manual state management - we need to track everything ourselves
  const [users, setUsers] = React.useState<User[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  // Manual fetch function with error handling and loading states
  const fetchUsers = React.useCallback(async () => {
    setIsLoading(true) // Manually set loading state
    setError(null) // Clear previous errors
    try {
      const data = await api.getUsers(shouldError)
      setUsers([...data]) // Manually update state with data
    } catch (err) {
      setError(err as Error) // Manually handle errors
    } finally {
      setIsLoading(false) // Manually clear loading state
    }
  }, [shouldError])

  // useEffect to trigger fetch on mount and when shouldError changes
  React.useEffect(() => {
    void fetchUsers() // Manually call our fetch function
  }, [fetchUsers])

  // Manually check loading state and render loading UI
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
        <p>Loading users...</p>
      </div>
    )
  }

  // Manually check error state and render error UI
  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-700 font-medium mb-2">Error Loading Users</h3>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button 
          onClick={() => void fetchUsers()} // Manually retry
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  // Manually render success state
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">User List</h3>
        <button 
          onClick={() => void fetchUsers()} // Manually trigger refetch
          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm"
        >
          Refetch
        </button>
      </div>
      
      <ul className="divide-y border rounded">
        {users.map(user => ( // No optional chaining needed since we control the state
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
`;

export const userListAngularCode = `
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(shouldError: boolean): Observable<User[]> {
    const url = shouldError ? '/api/users?error=true' : '/api/users';
    return this.http.get<User[]>(url);
  }
}

// user-list.component.ts
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() shouldError: boolean = false;
  
  users$!: Observable<User[]>;
  error: any = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  ngOnChanges() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.error = null;
    this.users$ = this.userService.getUsers(this.shouldError).pipe(
      catchError(err => {
        this.error = err;
        return of([]);
      })
    );
  }
}


<!-- user-list.component.html -->
<div *ngIf="users$ | async as users; else loadingOrError">
  <div class="flex justify-between items-center mb-4">
    <h3 class="font-medium">User List</h3>
    <button 
      (click)="fetchUsers()" 
      class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm"
    >
      Refetch
    </button>
  </div>
  
  <ul class="divide-y border rounded">
    <li *ngFor="let user of users" class="p-3 hover:bg-gray-50">
      <div class="font-medium">{{ user.name }}</div>
      <div class="text-sm text-gray-500">{{ user.email }}</div>
      <div class="text-xs mt-1 inline-block px-2 py-1 bg-gray-100 rounded-full">
        {{ user.role }}
      </div>
    </li>
  </ul>
</div>

<ng-template #loadingOrError>
  <!-- Error State -->
  <div *ngIf="error; else loading" class="p-6 bg-red-50 border border-red-200 rounded-lg">
    <h3 class="text-red-700 font-medium mb-2">Error Loading Users</h3>
    <p class="text-red-600 mb-4">{{ error.message }}</p>
    <button 
      (click)="fetchUsers()" 
      class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Try Again
    </button>
  </div>
</ng-template>

<ng-template #loading>
  <!-- Loading State -->
  <div class="p-8 text-center">
    <div class="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
    <p>Loading users...</p>
  </div>
</ng-template>
`;
