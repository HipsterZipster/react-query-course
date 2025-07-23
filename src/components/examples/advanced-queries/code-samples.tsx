// Advanced Queries Code Samples

// Dynamic Queries Code Samples
export const dynamicQueryReactQueryCode = `import { useQuery } from '@tanstack/react-query';
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
}`;

export const dynamicQueryVanillaCode = `import { useState, useEffect } from 'react';
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
}`;

// Conditional Queries Code Samples
export const conditionalQueryReactQueryCode = `import { useQuery } from '@tanstack/react-query';
import { api } from '../api/mock-api';

function ConditionalQueryExample({ userId, isEnabled }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
    enabled: isEnabled, // Only fetch when enabled is true
  });

  if (!isEnabled) {
    return <div>Query is disabled</div>;
  }

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.email}</p>
    </div>
  );
}`;

export const conditionalQueryVanillaCode = `import { useState, useEffect } from 'react';
import { api } from '../api/mock-api';

function ConditionalQueryVanilla({ userId, isEnabled }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEnabled) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

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
  }, [userId, isEnabled]);

  if (!isEnabled) {
    return <div>Query is disabled</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.email}</p>
    </div>
  );
}`;

// TypeScript Integration Code Samples
export const typescriptIntegrationReactQueryCode = `import { useQuery } from '@tanstack/react-query';
import { api } from '../api/mock-api';

// Define your data types
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

interface ApiError {
  message: string;
  code: number;
}

function TypeScriptQueryExample({ userId }: { userId: number }) {
  // TypeScript automatically infers the types
  const { 
    data, 
    isPending, 
    isError, 
    error 
  } = useQuery<User, ApiError>({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // TypeScript knows 'data' is of type User
  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.email}</p>
      <span className="badge">{data.role}</span>
    </div>
  );
}`;

export const typescriptIntegrationVanillaCode = `import { useState, useEffect } from 'react';
import { api } from '../api/mock-api';

// Manual type definitions
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

interface ApiError {
  message: string;
  code: number;
}

function TypeScriptVanilla({ userId }: { userId: number }) {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    setIsLoading(true);
    api.getUser(userId)
      .then((userData: User) => {
        setData(userData);
        setIsLoading(false);
      })
      .catch((err: ApiError) => {
        setError(err);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.email}</p>
      <span className="badge">{data.role}</span>
    </div>
  );
}`;

export const typescriptIntegrationAngularCode = `// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(\`/api/users/\${id}\`);
  }
}

// user.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  template: \`
    <div *ngIf="isLoading">Loading...</div>
    <div *ngIf="error">Error: {{ error }}</div>
    <div *ngIf="user">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <span class="badge">{{ user.role }}</span>
    </div>
  \`
})
export class UserComponent implements OnInit {
  @Input() userId!: number;
  user: User | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      }
    });
  }
}`;

// Multiple Queries Code Samples
export const multipleQueriesReactQueryCode = `import { useQuery } from '@tanstack/react-query';
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
}`;

export const multipleQueriesUseQueriesCode = `import { useQueries } from '@tanstack/react-query';
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
}`;

export const multipleQueriesVanillaCode = `import { useState, useEffect } from 'react';
import { api } from '../api/mock-api';

function MultipleQueriesVanilla() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [firstUserPosts, setFirstUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Parallel requests
        const [usersData, postsData] = await Promise.all([
          api.getUsers(),
          api.getPosts()
        ]);
        
        setUsers(usersData);
        setPosts(postsData);
        
        // Dependent request
        if (usersData.length > 0) {
          const firstUserPostsData = await api.getUserPosts(usersData[0].id);
          setFirstUserPosts(firstUserPostsData);
        }
        
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Users: {users.length}</h3>
      <h3>Posts: {posts.length}</h3>
      <p>First user's posts: {firstUserPosts.length}</p>
    </div>
  );
}`;
