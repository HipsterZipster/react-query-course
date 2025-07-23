import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

// Import Angular code examples for dynamic queries
import {
  angularComponentCode as dynamicAngularComponent,
  angularTemplateCode as dynamicAngularTemplate,
} from "../components/examples/advanced-queries/dynamic-query-angular";
// Import React component for dynamic query demo
import { DynamicQueryReact } from "../components/examples/advanced-queries/dynamic-query-react";

// Import Angular code examples for conditional queries
import {
  angularComponentCode as conditionalAngularComponent,
  angularTemplateCode as conditionalAngularTemplate,
} from "../components/examples/advanced-queries/conditional-query-angular";
// Import React component for conditional query demo
import { ConditionalQueryReact } from "../components/examples/advanced-queries/conditional-query-react";
// Import Angular code examples for multiple queries
import {
  angularComponentCode as multipleAngularComponent,
  angularTemplateCode as multipleAngularTemplate,
} from "../components/examples/advanced-queries/multiple-queries-angular";
// Import React component for multiple queries demo
import { MultipleQueriesReact } from "../components/examples/advanced-queries/multiple-queries-react";
// Import all pre-written code samples for comparison tabs
import {
  dynamicQueryReactQueryCode,
  dynamicQueryVanillaCode,
  conditionalQueryReactQueryCode,
  conditionalQueryVanillaCode,
  typescriptIntegrationReactQueryCode,
  typescriptIntegrationVanillaCode,
  typescriptIntegrationAngularCode,
  multipleQueriesReactQueryCode,
  multipleQueriesUseQueriesCode,
  multipleQueriesVanillaCode,
} from "../components/examples/advanced-queries/code-samples";
import { CodeExample } from "../components/examples/shared/code-example";
import { useMemo } from "react";

// Code Comparison Components
function CodeComparison({ 
  title, 
  beforeCode, 
  afterCode, 
  beforeTitle = "❌ Vanilla React", 
  afterTitle = "✅ React Query" 
}: {
  title: string;
  beforeCode: string;
  afterCode: string;
  beforeTitle?: string;
  afterTitle?: string;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  // Memoize highlighted code
  const highlightedBeforeCode = React.useMemo(() => {
    if (typeof window === "undefined") return beforeCode;
    
    try {
      const Prism = (window as any).Prism;
      if (Prism) {
        return Prism.highlight(beforeCode.trim(), Prism.languages.typescript, 'typescript');
      }
    } catch (error) {
      console.error('Error highlighting code:', error);
    }
    return beforeCode;
  }, [beforeCode]);
  
  const highlightedAfterCode = React.useMemo(() => {
    if (typeof window === "undefined") return afterCode;
    
    try {
      const Prism = (window as any).Prism;
      if (Prism) {
        return Prism.highlight(afterCode.trim(), Prism.languages.typescript, 'typescript');
      }
    } catch (error) {
      console.error('Error highlighting code:', error);
    }
    return afterCode;
  }, [afterCode]);
  
  // Load Prism on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    
    const loadPrism = async () => {
      if (!(window as any).Prism) {
        try {
          await import("prismjs");
          await import("prismjs/components/prism-typescript");
          await import("prismjs/components/prism-jsx");
          await import("prismjs/components/prism-tsx");
        } catch (error) {
          console.error("Failed to load Prism:", error);
        }
      }
    };
    
    loadPrism();
  }, []);
  
  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white">
          📋 {title}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {isExpanded ? "▼ Hide Code" : "▶ Show Code"}
        </span>
      </button>
      
      {isExpanded && (
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="font-medium text-red-700 dark:text-red-300">{beforeTitle}</h5>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <pre className="language-typescript cyberpunk-code p-4 text-sm overflow-x-auto">
                <code 
                  className="language-typescript"
                  dangerouslySetInnerHTML={{ __html: highlightedBeforeCode }}
                />
              </pre>
            </div>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-medium text-green-700 dark:text-green-300">{afterTitle}</h5>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <pre className="language-typescript cyberpunk-code p-4 text-sm overflow-x-auto">
                <code 
                  className="language-typescript"
                  dangerouslySetInnerHTML={{ __html: highlightedAfterCode }}
                />
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ParallelQueriesCodeComparison() {
  return (
    <CodeComparison
      title="Compare Parallel Queries Implementation"
      beforeCode={multipleQueriesVanillaCode}
      afterCode={multipleQueriesReactQueryCode}
      beforeTitle="❌ Vanilla React (48 lines)"
      afterTitle="✅ React Query (15 lines)"
    />
  );
}

function DependentQueriesCodeComparison() {
  return (
    <CodeComparison
      title="Compare Dependent Queries Implementation"
      beforeCode={conditionalQueryVanillaCode}
      afterCode={conditionalQueryReactQueryCode}
      beforeTitle="❌ Vanilla React (52 lines)"
      afterTitle="✅ React Query (12 lines)"
    />
  );
}

export const Route = createFileRoute("/examples/advanced-queries")({
  component: AdvancedQueriesExample,
});

/**
 * Advanced Querying Techniques - Perfect for demonstrating React Query's power
 * Shows 4 key patterns: Dynamic, Conditional, TypeScript, and Multiple queries
 */
function AdvancedQueriesExample(): React.ReactElement {
  const dynamicQueryWhy = useMemo(
    () => (
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          Why is this useful?
        </h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          Dynamic queries allow you to fetch different data based on user input
          or component state. This is essential for features like user profiles,
          search results, or any data that depends on parameters. React Query
          automatically manages caching and refetching when parameters change.
        </p>
      </div>
    ),
    [] // Empty dependency array - content never changes
  );

  const conditionalQueryWhy = useMemo(
    () => (
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-4">
        <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
          Why is this useful?
        </h3>
        <p className="text-green-700 dark:text-green-300 text-sm">
          Conditional queries prevent unnecessary network requests and give you
          fine-grained control over when data is fetched. This is perfect for
          dependent queries, user permissions, or when you want to wait for user
          input before loading data.
        </p>
      </div>
    ),
    [] // Memoized for performance
  );

  const typescriptIntegrationWhy = useMemo(
    () => (
      <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 mb-4">
        <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
          Why is this useful?
        </h3>
        <p className="text-purple-700 dark:text-purple-300 text-sm">
          TypeScript integration provides compile-time safety, better IDE
          support, and catches errors before runtime. You get autocomplete for
          your data structures, type checking for query results, and improved
          refactoring capabilities.
        </p>
      </div>
    ),
    [] // Static content, no dependencies needed
  );

  const multipleQueriesWhy = useMemo(
    () => (
      <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 mb-4">
        <h3 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
          Why is this useful?
        </h3>
        <p className="text-orange-700 dark:text-orange-300 text-sm">
          Multiple queries allow you to fetch different data sources
          simultaneously or create dependent queries. This improves performance
          by parallelizing requests and enables complex data relationships in
          your applications.
        </p>
      </div>
    ),
    [] // Memoized to prevent unnecessary re-renders
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">
          4. Advanced Querying Techniques
        </h1>
        <p className="text-gray-600">
          Learn advanced techniques like dynamic queries, conditional fetching,
          and managing multiple queries.
        </p>
      </header>

      <CodeExample
        title="Dynamic Queries with Parameters"
        why={dynamicQueryWhy}
        code={[
          {
            name: "React Query",
            code: dynamicQueryReactQueryCode,
            language: "typescript",
          },
          {
            name: "Vanilla React",
            code: dynamicQueryVanillaCode,
            language: "typescript",
          },
          {
            name: "Angular",
            code: dynamicAngularComponent + "\n\n" + dynamicAngularTemplate,
            language: "typescript",
          },
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Similar to passing arguments to your DAO methods in Java, React
            Query allows you to create dynamic queries by including parameters
            in the queryKey.
          </p>
          <DynamicQueryReact />
        </div>
      </CodeExample>

      <CodeExample
        title="Conditional Queries with enabled"
        why={conditionalQueryWhy}
        code={[
          {
            name: "React Query",
            code: conditionalQueryReactQueryCode,
            language: "typescript",
          },
          {
            name: "Vanilla React",
            code: conditionalQueryVanillaCode,
            language: "typescript",
          },
          {
            name: "Angular",
            code:
              conditionalAngularComponent + "\n\n" + conditionalAngularTemplate,
            language: "typescript",
          },
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Control when queries run using the enabled option. This is useful
            for dependent queries or user-controlled fetching.
          </p>
          <ConditionalQueryReact />
        </div>
      </CodeExample>

      <CodeExample
        title="TypeScript Integration"
        why={typescriptIntegrationWhy}
        code={[
          {
            name: "React Query",
            code: typescriptIntegrationReactQueryCode,
            language: "typescript",
          },
          {
            name: "Vanilla React",
            code: typescriptIntegrationVanillaCode,
            language: "typescript",
          },
          {
            name: "Angular",
            code: typescriptIntegrationAngularCode,
            language: "typescript",
          },
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            React Query provides excellent TypeScript support out of the box.
            Define your data types and get full type safety throughout your
            application.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Key TypeScript Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>Generic query functions with typed return values</li>
              <li>Automatic type inference for query results</li>
              <li>Type-safe error handling</li>
              <li>IntelliSense support for query options</li>
            </ul>
          </div>
        </div>
      </CodeExample>

      <CodeExample
        title="Multiple Queries"
        why={multipleQueriesWhy}
        code={[
          {
            name: "React Query",
            code: multipleQueriesReactQueryCode,
            language: "typescript",
          },
          {
            name: "useQueries Hook",
            code: multipleQueriesUseQueriesCode,
            language: "typescript",
          },
          {
            name: "Vanilla React",
            code: multipleQueriesVanillaCode,
            language: "typescript",
          },
          {
            name: "Angular",
            code: multipleAngularComponent + "\n\n" + multipleAngularTemplate,
            language: "typescript",
          },
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Manage multiple queries efficiently using React Query's built-in
            parallelization and the useQueries hook for dynamic query lists.
          </p>
          <MultipleQueriesReact />
        </div>
      </CodeExample>

      {/* Code Reduction Analysis Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">
          📊 Code Reduction Analysis: How Much Code Does React Query Save?
        </h2>
        
        <div className="space-y-8">
          {/* Parallel Queries Analysis */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🚀 Parallel Queries: 3 Simultaneous API Calls
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-red-700 dark:text-red-300">❌ Vanilla React (48 lines)</h4>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border-l-4 border-red-500 text-sm">
                  <ul className="space-y-1 text-red-800 dark:text-red-200">
                    <li>• 15 lines: State management (data, loading, error for 3 queries)</li>
                    <li>• 18 lines: useEffect with Promise.all orchestration</li>
                    <li>• 8 lines: Error handling and loading state updates</li>
                    <li>• 7 lines: Conditional rendering logic</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-green-700 dark:text-green-300">✅ React Query (15 lines)</h4>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border-l-4 border-green-500 text-sm">
                  <ul className="space-y-1 text-green-800 dark:text-green-200">
                    <li>• 9 lines: Three useQuery hooks (3 lines each)</li>
                    <li>• 3 lines: Loading state check</li>
                    <li>• 3 lines: Render logic</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <p className="text-blue-900 dark:text-blue-100 font-semibold">
                💡 <strong>68% Code Reduction:</strong> From 48 lines to 15 lines = <strong>33 lines saved!</strong>
              </p>
            </div>
            
            {/* Expandable Code Comparison for Parallel Queries */}
            <ParallelQueriesCodeComparison />
          </div>

          {/* Dependent Queries Analysis */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🔗 Dependent Queries: User → Posts Chain
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-red-700 dark:text-red-300">❌ Vanilla React (52 lines)</h4>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border-l-4 border-red-500 text-sm">
                  <ul className="space-y-1 text-red-800 dark:text-red-200">
                    <li>• 18 lines: State management (users, posts, loading, error states)</li>
                    <li>• 22 lines: Complex useEffect with sequential API calls</li>
                    <li>• 6 lines: Conditional logic for dependent fetching</li>
                    <li>• 6 lines: Error handling and state cleanup</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-green-700 dark:text-green-300">✅ React Query (12 lines)</h4>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border-l-4 border-green-500 text-sm">
                  <ul className="space-y-1 text-green-800 dark:text-green-200">
                    <li>• 3 lines: First useQuery (users)</li>
                    <li>• 5 lines: Dependent useQuery with enabled condition</li>
                    <li>• 2 lines: Loading state check</li>
                    <li>• 2 lines: Render logic</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <p className="text-blue-900 dark:text-blue-100 font-semibold">
                💡 <strong>77% Code Reduction:</strong> From 52 lines to 12 lines = <strong>40 lines saved!</strong>
              </p>
            </div>
            
            {/* Expandable Code Comparison for Dependent Queries */}
            <DependentQueriesCodeComparison />
          </div>

          {/* State Management Breakdown */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🎯 State Management: What You Get For Free
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">isLoading</div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Automatic loading states</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">isError</div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Built-in error handling</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">data</div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Type-safe data access</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">isPending</div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Initial fetch state</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">isPlaceholderData</div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Stale data indicators</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 p-6 rounded-lg border border-green-200 dark:border-green-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🏆 Total Impact: Why React Query is a Game Changer
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">📉 Lines of Code Saved:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Parallel queries: <strong>33 lines saved (68% reduction)</strong></li>
                  <li>• Dependent queries: <strong>40 lines saved (77% reduction)</strong></li>
                  <li>• Average per query: <strong>10-15 lines saved</strong></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">🚀 What You Get:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Automatic caching and background updates</li>
                  <li>• Built-in retry logic and error boundaries</li>
                  <li>• TypeScript inference and type safety</li>
                  <li>• Optimistic updates and mutation support</li>
                  <li>• DevTools for debugging and monitoring</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                🎯 <strong>Result:</strong> Write 70% less code while getting 300% more functionality!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
