import * as React from 'react';

interface CodeExampleProps {
  readonly liveExample: React.ReactNode;
  readonly code: Record<string, string>;
}

export function CodeExample({ liveExample, code }: CodeExampleProps): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState(Object.keys(code)[0]);

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Live Example</h2>
        {liveExample}
      </div>

      <div className="bg-white p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Code</h2>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {Object.keys(code).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {key}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-4">
          <pre className="text-sm bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            <code>{code[activeTab]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
