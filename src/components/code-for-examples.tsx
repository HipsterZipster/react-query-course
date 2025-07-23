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
          onClick={() => fetchUsers()} // Call our manual fetch function for retry
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  // Success state - render the data we manually fetched and stored
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">User List</h3>
        <button 
          onClick={() => fetchUsers()} // Manually trigger refetch
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
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(shouldError: boolean): Observable<User[]> {
    return this.http.get<User[]>(
      shouldError ? '/api/users-error' : '/api/users'
    );
  }
}

// user-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  @Input() shouldError: boolean = false;
  users$!: Observable<User[]>;
  error: any = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
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
    <button (click)="fetchUsers()" class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm">
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
  <div *ngIf="error; else loading" class="p-6 bg-red-50 border border-red-200 rounded-lg">
    <h3 class="text-red-700 font-medium mb-2">Error Loading Users</h3>
    <p class="text-red-600 mb-4">{{ error.message }}</p>
    <button (click)="fetchUsers()" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
      Try Again
    </button>
  </div>
</ng-template>

<ng-template #loading>
  <div class="p-8 text-center">
    <div class="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
    <p>Loading users...</p>
  </div>
</ng-template>
`;

export const suspenseReactQueryCode = `
import * as React from 'react'
import { Suspense } from 'react'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { api, Post } from '../api/mock-api'

/**
 * Traditional Posts component using useQuery - requires manual loading states
 */
function TraditionalPosts(): React.ReactElement {
  // Standard useQuery - we handle loading and error states manually
  const postsQuery = useQuery<readonly Post[], Error>({
    queryKey: ['posts'],
    queryFn: () => api.getPosts(),
  })

  // Manual loading state handling
  if (postsQuery.isPending) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
        <p>Loading posts...</p>
      </div>
    )
  }

  // Manual error state handling
  if (postsQuery.isError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-700 font-medium mb-2">Error Loading Posts</h3>
        <p className="text-red-600">
          {postsQuery.error.message}
        </p>
      </div>
    )
  }

  // Render data when available
  return (
    <div className="border rounded divide-y">
      {postsQuery.data?.map((post) => (
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

/**
 * Suspense Posts component using useSuspenseQuery - no loading states needed!
 */
function SuspensePosts(): React.ReactElement {
  // useSuspenseQuery suspends the component until data is ready
  const { data } = useSuspenseQuery<readonly Post[]>({ 
    queryKey: ['posts'], 
    queryFn: () => api.getPosts(),
  })
  // No isPending check needed - component won't render until data is available
  // No isError check needed - errors are thrown and caught by Error Boundaries

  return (
    <div className="border rounded divide-y">
      {data.map((post) => ( // No optional chaining needed - data is guaranteed
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

/**
 * Loading fallback component for Suspense
 */
function LoadingFallback(): React.ReactElement {
  return (
    <div className="p-8 text-center">
      <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
      <p>Loading data with Suspense...</p>
    </div>
  )
}

class ErrorBoundary extends React.Component<
  { readonly children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { readonly children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean; error: Error } {
    return { hasError: true, error }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-700 font-medium mb-2">Something went wrong</h3>
          <p className="text-red-600">
            {this.state.error?.message || 'An unknown error occurred'}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

// Main component to render
export function SuspenseReactQueryExample() {
  const [useSuspense, setUseSuspense] = React.useState<boolean>(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setUseSuspense(false)}
            className="px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-200"
          >
            Traditional useQuery
          </button>
          <button
            type="button"
            onClick={() => setUseSuspense(true)}
            className="px-4 py-2 text-sm font-medium rounded-r-lg border border-gray-200"
          >
            useSuspenseQuery
          </button>
        </div>
      </div>

      {useSuspense ? (
        <div>
          <h3 className="text-lg font-medium mb-2">Suspense Example</h3>
          <p className="mb-3 text-sm text-gray-600">
            Notice how we don't need to handle loading states manually. React Suspense takes care of it.
          </p>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <SuspensePosts />
            </Suspense>
          </ErrorBoundary>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">Traditional Example</h3>
          <TraditionalPosts />
        </div>
      )}
    </div>
  );
}
`;

export const suspenseVanillaCode = `
import React from 'react';
import { api, Post } from '../api/mock-api';

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
`;

export const suspenseAngularCode = `
// post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts');
  }
}

// posts-suspense.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post, PostService } from './post.service';

@Component({
  selector: 'app-posts-suspense',
  templateUrl: './posts-suspense.component.html',
})
export class PostsSuspenseComponent implements OnInit {
  posts$!: Observable<Post[]>;
  error: any = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.posts$ = this.postService.getPosts().pipe(
      catchError(err => {
        this.error = err;
        // In a real app, you might return an empty array or re-throw
        return of([]); 
      })
    );
  }
}


<!-- posts-suspense.component.html -->
<div *ngIf="posts$ | async as posts; else loadingOrError" class="border rounded divide-y">
  <div *ngFor="let post of posts" class="p-3">
    <h3 class="font-medium">{{ post.title }}</h3>
    <p class="text-sm text-gray-600">{{ post.content.substring(0, 100) }}...</p>
    <div class="mt-1 text-xs text-gray-500">
      Author ID: {{ post.authorId }} | {{ post.createdAt | date }}
    </div>
  </div>
</div>

<ng-template #loadingOrError>
  <!-- Error State -->
  <div *ngIf="error; else loading" class="p-6 bg-red-50 border border-red-200 rounded-lg">
    <h3 class="text-red-700 font-medium mb-2">Something went wrong</h3>
    <p class="text-red-600">{{ error.message }}</p>
  </div>
</ng-template>

<ng-template #loading>
  <!-- Loading State -->
  <div class="p-8 text-center">
    <div class="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full h-8 w-8 mb-2"></div>
    <p>Loading data with the async pipe...</p>
  </div>
</ng-template>
`;
