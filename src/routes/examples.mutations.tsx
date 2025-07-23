import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, User, useErrorToggle } from "../api/mock-api";
import { CodeExample } from "../components/examples/shared/code-example";
import { CodeComparison } from "../components/examples/shared/code-comparison";
import {
  createUserReactQueryCode,
  createUserVanillaCode,
  createUserAngularCode,
  optimisticUpdateReactQueryCode,
  optimisticUpdateVanillaCode,
  optimisticUpdateAngularCode,
  deleteUserReactQueryCode,
  deleteUserVanillaCode,
  deleteUserAngularCode,
} from "../components/examples/mutations/code-samples";

export const Route = createFileRoute("/examples/mutations")({
  component: MutationsExample,
});

/**
 * Mutations Example Page - Demonstrates React Query's useMutation hook
 * Shows 3 key mutation patterns: Create, Optimistic Updates, and Delete
 */
function MutationsExample(): React.ReactElement {
  const createUserWhy = (
    <div className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-r-lg">
      <h3 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">
        Why is this useful? - Creating Users
      </h3>
      <p className="text-emerald-700 dark:text-emerald-300 text-sm">
        React Query's useMutation hook simplifies data creation by handling
        loading states, error management, and automatic cache invalidation.
        Unlike manual approaches, it provides built-in retry logic, optimistic
        updates, and seamless integration with your query cache, ensuring your
        UI stays consistent after mutations.
      </p>
    </div>
  );

  const optimisticUpdateWhy = (
    <div className="border-l-4 border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-r-lg">
      <h3 className="font-medium text-cyan-800 dark:text-cyan-200 mb-2">
        Why is this useful? - Optimistic Updates
      </h3>
      <p className="text-cyan-700 dark:text-cyan-300 text-sm">
        Optimistic updates make your app feel instantly responsive by updating
        the UI immediately, before the server responds. React Query handles the
        complexity of rolling back changes if the mutation fails, providing a
        smooth user experience while maintaining data consistency across your
        application.
      </p>
    </div>
  );

  const deleteUserWhy = (
    <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-r-lg">
      <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
        Why is this useful? - Deleting Users
      </h3>
      <p className="text-red-700 dark:text-red-300 text-sm">
        React Query's mutation system provides safe deletion with automatic
        cache updates, error handling, and loading states. It ensures your UI
        stays synchronized with the server state and provides built-in patterns
        for confirmation dialogs and rollback scenarios if deletions fail.
      </p>
    </div>
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">
          5. Mutations with React Query
        </h1>
        <p className="text-gray-600">
          Learn how to perform data mutations (create, update, delete) with
          React Query's useMutation hook, including optimistic updates and error
          handling.
        </p>
      </header>

      <div className="space-y-6">
        <CodeExample
          title="Creating Users with Form Handling"
          why={createUserWhy}
          code={[
            {
              name: "React Query",
              code: createUserReactQueryCode,
              language: "typescript",
            },
            {
              name: "Vanilla React",
              code: createUserVanillaCode,
              language: "typescript",
            },
            {
              name: "Angular",
              code: createUserAngularCode,
              language: "typescript",
            },
          ]}
        >
          <CreateUserForm />
        </CodeExample>
        <CreateUserCodeComparison />
      </div>

      <div className="space-y-6">
        <CodeExample
          title="Optimistic Updates with Rollback"
          why={optimisticUpdateWhy}
          code={[
            {
              name: "React Query",
              code: optimisticUpdateReactQueryCode,
              language: "typescript",
            },
            {
              name: "Vanilla React",
              code: optimisticUpdateVanillaCode,
              language: "typescript",
            },
            {
              name: "Angular",
              code: optimisticUpdateAngularCode,
              language: "typescript",
            },
          ]}
        >
          <OptimisticUpdateExample />
        </CodeExample>
        <OptimisticUpdateCodeComparison />
      </div>

      <div className="space-y-6">
        <CodeExample
          title="Deleting Users with Confirmation"
          why={deleteUserWhy}
          code={[
            {
              name: "React Query",
              code: deleteUserReactQueryCode,
              language: "typescript",
            },
            {
              name: "Vanilla React",
              code: deleteUserVanillaCode,
              language: "typescript",
            },
            {
              name: "Angular",
              code: deleteUserAngularCode,
              language: "typescript",
            },
          ]}
        >
          <DeleteUsersDemo />
        </CodeExample>
        <DeleteUserCodeComparison />
      </div>

      {/* Mutations Code Reduction Analysis */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          📊 Mutations Code Reduction Analysis
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Create User Analysis */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
              🆕 Create User Operations
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-red-600 dark:text-red-400">
                  ❌ Vanilla React:
                </span>
                <span className="font-bold">40 lines</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600 dark:text-green-400">
                  ✅ React Query:
                </span>
                <span className="font-bold">30 lines</span>
              </div>
              <div className="border-t pt-2">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  25% reduction
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  10 lines saved with automatic cache invalidation
                </p>
              </div>
            </div>
          </div>

          {/* Optimistic Updates Analysis */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-cyan-200 dark:border-cyan-700">
            <h3 className="text-lg font-semibold text-cyan-800 dark:text-cyan-200 mb-4">
              ⚡ Optimistic Updates
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-red-600 dark:text-red-400">
                  ❌ Vanilla React:
                </span>
                <span className="font-bold">45 lines</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600 dark:text-green-400">
                  ✅ React Query:
                </span>
                <span className="font-bold">25 lines</span>
              </div>
              <div className="border-t pt-2">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  44% reduction
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  20 lines saved with built-in rollback logic
                </p>
              </div>
            </div>
          </div>

          {/* Delete Operations Analysis */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-red-200 dark:border-red-700">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
              🗑️ Delete Operations
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-red-600 dark:text-red-400">
                  ❌ Vanilla React:
                </span>
                <span className="font-bold">35 lines</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600 dark:text-green-400">
                  ✅ React Query:
                </span>
                <span className="font-bold">20 lines</span>
              </div>
              <div className="border-t pt-2">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  43% reduction
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  15 lines saved with automatic cache cleanup
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What You Get For Free */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-purple-700 mb-6">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
            🎁 What You Get For Free with useMutation
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="font-medium text-purple-800 dark:text-purple-200">
                isPending
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                Automatic loading states
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="font-medium text-purple-800 dark:text-purple-200">
                isError
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                Built-in error handling
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="font-medium text-purple-800 dark:text-purple-200">
                onSuccess
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                Cache invalidation hooks
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="font-medium text-purple-800 dark:text-purple-200">
                onMutate
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                Optimistic update support
              </div>
            </div>
          </div>
        </div>

        {/* Total Impact */}
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            🎯 Total Mutations Impact
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            <strong>Average Code Reduction:</strong> 25-44% less code to write
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Lines Saved:</strong> 10-20 lines per mutation operation
          </p>
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Write 35% less code while getting 200% more functionality!
          </div>
        </div>
      </section>
    </div>
  );
}

// Create User Form Component
function CreateUserForm(): React.ReactElement {
  const [shouldError] = useErrorToggle();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<"admin" | "user" | "viewer">("user");
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (newUser: Omit<User, "id">) =>
      api.createUser(newUser, shouldError),
    onSuccess: () => {
      // Clear the form
      setName("");
      setEmail("");
      setRole("user");
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      createUserMutation.mutate({ name, email, role });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter user name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter user email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Role
        </label>
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "admin" | "user" | "viewer")
          }
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="viewer">Viewer</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={createUserMutation.isPending || !name || !email}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {createUserMutation.isPending ? "Creating..." : "Create User"}
      </button>
      {createUserMutation.isError && (
        <p className="text-red-500 text-sm mt-2">
          Error: {createUserMutation.error?.message}
        </p>
      )}
      {createUserMutation.isSuccess && (
        <p className="text-green-500 text-sm mt-2">
          User created successfully!
        </p>
      )}
    </form>
  );
}

// Optimistic Update Example Component
function OptimisticUpdateExample(): React.ReactElement {
  const [shouldError] = useErrorToggle();

  // Use local state for the demo user to avoid cache flashing
  const [currentUser, setCurrentUser] = React.useState<User>({
    id: 999,
    name: "Demo User",
    email: "demo@example.com",
    role: "viewer",
  });

  // Memoize the mutation function to prevent unnecessary re-renders
  const mutationFn = React.useCallback(
    (updatedUser: Partial<User>) =>
      api.updateUser(999, updatedUser, shouldError),
    [shouldError]
  );

  const updateUserMutation = useMutation({
    mutationFn,

    onMutate: async (updatedUser) => {
      // Capture the current state before optimistic update
      const previousUser = currentUser;

      // Optimistic update - immediately update local state
      setCurrentUser((prev) => ({ ...prev, ...updatedUser }));

      return { previousUser };
    },

    onError: (_, __, context) => {
      // Rollback optimistic update on error
      if (context?.previousUser) {
        setCurrentUser(context.previousUser);
      }
    },

    onSuccess: (data) => {
      // Update with server response on success
      setCurrentUser(data);
    },
  });

  const handleUpdate = React.useCallback(() => {
    const newName = currentUser.name.includes("(Updated)")
      ? "Demo User"
      : currentUser.name + " (Updated)";

    updateUserMutation.mutate({ name: newName });
  }, [currentUser.name, updateUserMutation]);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
          Current User:
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          Name: {currentUser.name}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Email: {currentUser.email}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Role: {currentUser.role}
        </p>
      </div>

      <button
        onClick={handleUpdate}
        disabled={updateUserMutation.isPending}
        className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 disabled:opacity-50 transition-colors"
      >
        {updateUserMutation.isPending ? "Updating..." : "Toggle Update"}
      </button>

      {updateUserMutation.isError && (
        <p className="text-red-500 text-sm">
          Error: {updateUserMutation.error?.message}
        </p>
      )}
    </div>
  );
}

// Delete Users Demo Component
function DeleteUsersDemo(): React.ReactElement {
  const [users, setUsers] = React.useState<User[]>([
    {
      id: 101,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "admin",
    },
    { id: 102, name: "Bob Smith", email: "bob@example.com", role: "user" },
    {
      id: 103,
      name: "Carol Davis",
      email: "carol@example.com",
      role: "viewer",
    },
  ]);
  const [shouldError] = useErrorToggle();

  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => api.deleteUser(userId, shouldError),
    onSuccess: (_, userId) => {
      // Remove user from local state
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    },
  });

  const handleDelete = (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUserMutation.mutate(user.id);
    }
  };

  return (
    <div className="space-y-4">
      {users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No users remaining. Refresh the page to reset the demo.
        </p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email} • {user.role}
              </p>
            </div>
            <button
              onClick={() => handleDelete(user)}
              disabled={deleteUserMutation.isPending}
              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 disabled:opacity-50 transition-colors text-sm"
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))
      )}

      {deleteUserMutation.isError && (
        <p className="text-red-500 text-sm">
          Error: {deleteUserMutation.error?.message}
        </p>
      )}
    </div>
  );
}

function CreateUserCodeComparison() {
  return (
    <CodeComparison
      title="Compare Create User Implementation"
      beforeCode={createUserVanillaCode}
      afterCode={createUserReactQueryCode}
      beforeTitle="❌ Vanilla React (40 lines)"
      afterTitle="✅ React Query (30 lines)"
    />
  );
}

function OptimisticUpdateCodeComparison() {
  return (
    <CodeComparison
      title="Compare Optimistic Update Implementation"
      beforeCode={optimisticUpdateVanillaCode}
      afterCode={optimisticUpdateReactQueryCode}
      beforeTitle="❌ Vanilla React (45 lines)"
      afterTitle="✅ React Query (25 lines)"
    />
  );
}

function DeleteUserCodeComparison() {
  return (
    <CodeComparison
      title="Compare Delete User Implementation"
      beforeCode={deleteUserVanillaCode}
      afterCode={deleteUserReactQueryCode}
      beforeTitle="❌ Vanilla React (35 lines)"
      afterTitle="✅ React Query (20 lines)"
    />
  );
}
