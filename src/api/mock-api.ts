/**
 * Mock API client for the React Query course examples
 * Simulates backend API calls with different response patterns
 */
import { useState } from 'react';

export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly friends?: Pick<User, 'id' | 'name'>[];
}

export interface Post {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly authorId: number;
  readonly createdAt: string;
}

export interface Comment {
  readonly id: number;
  readonly postId: number;
  readonly authorId: number;
  readonly content: string;
  readonly createdAt: string;
}

// Mock data
const users: readonly User[] = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'editor' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'viewer' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'editor' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'viewer' },
];

const posts: readonly Post[] = [
  {
    id: 1,
    title: 'Introduction to React Query',
    content: 'React Query is a powerful library for managing server state in React applications...',
    authorId: 1,
    createdAt: '2025-07-10T14:30:00Z',
  },
  {
    id: 2,
    title: 'TypeScript Best Practices',
    content: 'TypeScript provides strong typing which helps prevent many common errors...',
    authorId: 2,
    createdAt: '2025-07-12T09:15:00Z',
  },
  {
    id: 3,
    title: 'State Management in React',
    content: 'There are many approaches to state management in React applications...',
    authorId: 1,
    createdAt: '2025-07-15T11:45:00Z',
  },
  {
    id: 4,
    title: 'Async/Await in JavaScript',
    content: 'Async/await provides a more readable way to work with Promises...',
    authorId: 3,
    createdAt: '2025-07-18T16:20:00Z',
  },
  {
    id: 5,
    title: 'RESTful API Design',
    content: 'Designing a good RESTful API requires careful consideration of resources and endpoints...',
    authorId: 4,
    createdAt: '2025-07-20T10:30:00Z',
  },
];

const comments: readonly Comment[] = [
  {
    id: 1,
    postId: 1,
    authorId: 2,
    content: 'Great introduction! Very helpful.',
    createdAt: '2025-07-10T15:30:00Z',
  },
  {
    id: 2,
    postId: 1,
    authorId: 3,
    content: 'I\'ve been using React Query for a while and it\'s a game changer.',
    createdAt: '2025-07-10T16:45:00Z',
  },
  {
    id: 3,
    postId: 2,
    authorId: 1,
    content: 'TypeScript has improved our codebase significantly.',
    createdAt: '2025-07-12T10:20:00Z',
  },
  {
    id: 4,
    postId: 3,
    authorId: 4,
    content: 'I prefer Redux for complex state management.',
    createdAt: '2025-07-15T13:10:00Z',
  },
  {
    id: 5,
    postId: 4,
    authorId: 5,
    content: 'Async/await has made my code much more readable!',
    createdAt: '2025-07-18T17:30:00Z',
  },
];

// Simulate network delay
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Simulate error for testing error handling
export const useErrorToggle = (): readonly [boolean, () => void] => {
  const [shouldError, setShouldError] = useState<boolean>(false);
  
  const toggleError = (): void => {
    setShouldError(prev => !prev);
  };
  
  return [shouldError, toggleError] as const;
};

/**
 * API client with methods that mimic a backend service
 */
export const api = {
  /**
   * Get all users
   */
  getUsers: async (shouldError = false): Promise<readonly User[]> => {
    await delay(1000);
    if (shouldError) {
      throw new Error('Failed to fetch users');
    }
    return users;
  },
  
  /**
   * Get a single user by ID
   */
    getUser: async (id: number, includeFriends = false): Promise<User> => {
    await delay(800);
    const user = users.find(user => user.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    if (includeFriends) {
      const friends = users
        .filter(u => u.id !== id)
        .slice(0, 2)
        .map(({ id, name }) => ({ id, name }));
      return { ...user, friends };
    }
    return user;
  },
  
  /**
   * Get all posts
   */
  getPosts: async (shouldError = false): Promise<readonly Post[]> => {
    await delay(1200);
    if (shouldError) {
      throw new Error('Failed to fetch posts');
    }
    return posts;
  },
  
  /**
   * Get a single post by ID
   */
  getPost: async (id: number, shouldError = false): Promise<Post> => {
    await delay(1000);
    if (shouldError) {
      throw new Error(`Failed to fetch post with ID ${id}`);
    }
    const post = posts.find(post => post.id === id);
    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }
    return post;
  },
  
  /**
   * Get posts by author ID
   */
  getPostsByAuthor: async (authorId: number, shouldError = false): Promise<readonly Post[]> => {
    await delay(1500);
    if (shouldError) {
      throw new Error(`Failed to fetch posts for author with ID ${authorId}`);
    }
    return posts.filter(post => post.authorId === authorId);
  },
  
  /**
   * Get comments for a post
   */
  getCommentsByPost: async (postId: number, shouldError = false): Promise<readonly Comment[]> => {
    await delay(700);
    if (shouldError) {
      throw new Error(`Failed to fetch comments for post with ID ${postId}`);
    }
    return comments.filter(comment => comment.postId === postId);
  },
};
