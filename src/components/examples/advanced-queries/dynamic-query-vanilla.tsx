import * as React from "react";
import { api, User } from "../../../api/mock-api";

export function DynamicQueryVanilla(): React.ReactElement {
  const [userId, setUserId] = React.useState<number>(1);
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.getUser(userId);
        setUser(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUser();
  }, [userId]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Select User ID:
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((id) => (
            <button
              key={id}
              onClick={() => setUserId(id)}
              className={`px-3 py-1 rounded ${
                userId === id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <h3 className="font-medium mb-2">Dynamic Query Result</h3>

        {isLoading && <p>Loading user...</p>}

        {error && <p className="text-red-500">{error.message}</p>}

        {user && (
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-gray-600">{user.email}</div>
            <div className="mt-1 text-xs bg-blue-100 rounded-full px-2 py-1 inline-block">
              {user.role}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
