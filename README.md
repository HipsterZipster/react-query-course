# React Query Course: From Java Beans to React Hooks

A developer's guide to TanStack Query designed for experienced Java engineers transitioning to front-end development with React.

## Course Overview

This course is structured as a 30-minute tech talk with live coding examples to introduce Java developers to modern data fetching and state management in React using TanStack Query.

### Learning Objectives

1. Understand why TanStack Query is valuable for Java developers moving to front-end development
2. Compare familiar Java patterns with React/TypeScript approaches to data management
3. Master the core concepts of TanStack Query through practical examples
4. Build confidence in implementing efficient data fetching strategies in React

## Course Outline

1. **Introduction: Bridging the Gap** (5 minutes)
   - Why this matters for Java developers
   - Traditional React data fetching challenges
   - TanStack Query as a solution (comparable to Hibernate/JPA)

2. **Getting Started with TanStack Query** (10 minutes)
   - Project setup and installation
   - QueryClient & QueryClientProvider
   - Java analogies: connection pools and EntityManagerFactory

3. **The useQuery Hook** (15 minutes)
   - queryKey and queryFn core concepts
   - Handling loading, error states, and refetching
   - Live coding demo

4. **Advanced Querying Techniques** (15 minutes)
   - Dynamic queries with parameters
   - Conditional querying with enabled
   - TypeScript integration
   - Multiple and dependent queries

5. **useSuspenseQuery and React Suspense** (5 minutes)
   - Introduction to React Suspense
   - Simplifying loading states

## Development

To run this project locally:

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Examples Structure

The examples in this repository are organized to follow the course outline:

1. `/src/examples/01-basic-query` - Basic query implementation and concepts
2. `/src/examples/02-query-with-parameters` - Passing parameters to queries
3. `/src/examples/03-conditional-queries` - Using the enabled option
4. `/src/examples/04-multiple-queries` - Multiple and dependent queries
5. `/src/examples/05-suspense-query` - Using React Suspense with queries
