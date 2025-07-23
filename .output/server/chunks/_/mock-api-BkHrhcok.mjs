import { useState } from 'react';

const users = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", role: "editor" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "viewer" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "editor" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "viewer" }
];
const posts = [
  {
    id: 1,
    title: "Introduction to React Query",
    content: "React Query is a powerful library for managing server state in React applications...",
    authorId: 1,
    createdAt: "2025-07-10T14:30:00Z"
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    content: "TypeScript provides strong typing which helps prevent many common errors...",
    authorId: 2,
    createdAt: "2025-07-12T09:15:00Z"
  },
  {
    id: 3,
    title: "State Management in React",
    content: "There are many approaches to state management in React applications...",
    authorId: 1,
    createdAt: "2025-07-15T11:45:00Z"
  },
  {
    id: 4,
    title: "Async/Await in JavaScript",
    content: "Async/await provides a more readable way to work with Promises...",
    authorId: 3,
    createdAt: "2025-07-18T16:20:00Z"
  },
  {
    id: 5,
    title: "RESTful API Design",
    content: "Designing a good RESTful API requires careful consideration of resources and endpoints...",
    authorId: 4,
    createdAt: "2025-07-20T10:30:00Z"
  }
];
const comments = [
  {
    id: 1,
    postId: 1,
    authorId: 2,
    content: "Great introduction! Very helpful.",
    createdAt: "2025-07-10T15:30:00Z"
  },
  {
    id: 2,
    postId: 1,
    authorId: 3,
    content: "I've been using React Query for a while and it's a game changer.",
    createdAt: "2025-07-10T16:45:00Z"
  },
  {
    id: 3,
    postId: 2,
    authorId: 1,
    content: "TypeScript has improved our codebase significantly.",
    createdAt: "2025-07-12T10:20:00Z"
  },
  {
    id: 4,
    postId: 3,
    authorId: 4,
    content: "I prefer Redux for complex state management.",
    createdAt: "2025-07-15T13:10:00Z"
  },
  {
    id: 5,
    postId: 4,
    authorId: 5,
    content: "Async/await has made my code much more readable!",
    createdAt: "2025-07-18T17:30:00Z"
  }
];
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const useErrorToggle = () => {
  const [shouldError, setShouldError] = useState(false);
  const toggleError = () => {
    setShouldError((prev) => !prev);
  };
  return [shouldError, toggleError];
};
const api = {
  /**
   * Get all users
   */
  getUsers: async (shouldError = false) => {
    await delay(1e3);
    if (shouldError) {
      throw new Error("Failed to fetch users");
    }
    return users;
  },
  /**
   * Get a single user by ID
   */
  getUser: async (id, shouldError = false) => {
    await delay(800);
    if (shouldError) {
      throw new Error(`Failed to fetch user with ID ${id}`);
    }
    const user = users.find((user2) => user2.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  },
  /**
   * Get all posts
   */
  getPosts: async (shouldError = false) => {
    await delay(1200);
    if (shouldError) {
      throw new Error("Failed to fetch posts");
    }
    return posts;
  },
  /**
   * Get a single post by ID
   */
  getPost: async (id, shouldError = false) => {
    await delay(1e3);
    if (shouldError) {
      throw new Error(`Failed to fetch post with ID ${id}`);
    }
    const post = posts.find((post2) => post2.id === id);
    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }
    return post;
  },
  /**
   * Get posts by author ID
   */
  getPostsByAuthor: async (authorId, shouldError = false) => {
    await delay(1500);
    if (shouldError) {
      throw new Error(`Failed to fetch posts for author with ID ${authorId}`);
    }
    return posts.filter((post) => post.authorId === authorId);
  },
  /**
   * Get comments for a post
   */
  getCommentsByPost: async (postId, shouldError = false) => {
    await delay(700);
    if (shouldError) {
      throw new Error(`Failed to fetch comments for post with ID ${postId}`);
    }
    return comments.filter((comment) => comment.postId === postId);
  }
};

export { api as a, useErrorToggle as u };
//# sourceMappingURL=mock-api-BkHrhcok.mjs.map
