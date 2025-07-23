import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  angularComponentCode as dynamicAngularComponent,
  angularTemplateCode as dynamicAngularTemplate,
} from "../components/examples/advanced-queries/dynamic-query-angular";
import { DynamicQueryReact } from "../components/examples/advanced-queries/dynamic-query-react";

import {
  angularComponentCode as conditionalAngularComponent,
  angularTemplateCode as conditionalAngularTemplate,
} from "../components/examples/advanced-queries/conditional-query-angular";
import { ConditionalQueryReact } from "../components/examples/advanced-queries/conditional-query-react";
import {
  angularComponentCode as multipleAngularComponent,
  angularTemplateCode as multipleAngularTemplate,
} from "../components/examples/advanced-queries/multiple-queries-angular";
import { MultipleQueriesReact } from "../components/examples/advanced-queries/multiple-queries-react";
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

// Why content constants to prevent re-renders
const dynamicQueryWhy = useMemo(
  () => (
    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4">
      <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
        Why is this useful?
      </h3>
      <p className="text-blue-700 dark:text-blue-300 text-sm">
        Dynamic queries allow you to fetch different data based on user input or
        component state. This is essential for features like user profiles,
        search results, or any data that depends on parameters. React Query
        automatically manages caching and refetching when parameters change.
      </p>
    </div>
  ),
  []
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
  []
);

const typescriptIntegrationWhy = useMemo(
  () => (
    <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 mb-4">
      <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
        Why is this useful?
      </h3>
      <p className="text-purple-700 dark:text-purple-300 text-sm">
        TypeScript integration provides compile-time safety, better IDE support,
        and catches errors before runtime. You get autocomplete for your data
        structures, type checking for query results, and improved refactoring
        capabilities.
      </p>
    </div>
  ),
  []
);

const multipleQueriesWhy = useMemo(
  () => (
    <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 mb-4">
      <h3 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
        Why is this useful?
      </h3>
      <p className="text-orange-700 dark:text-orange-300 text-sm">
        Multiple queries allow you to fetch different data sources
        simultaneously or create dependent queries. This improves performance by
        parallelizing requests and enables complex data relationships in your
        applications.
      </p>
    </div>
  ),
  []
);

export const Route = createFileRoute("/examples/advanced-queries")({
  component: AdvancedQueriesExample,
});

/**
 * Advanced Querying Techniques - Demonstrating dynamic queries, conditional fetching, and TypeScript integration
 */
function AdvancedQueriesExample(): React.ReactElement {
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
            React Query works seamlessly with TypeScript, providing strong
            typing for your queries and results.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-2">
              Benefits of TypeScript with React Query:
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Strongly typed query results</li>
              <li>Autocomplete for query options</li>
              <li>Type checking for query keys</li>
              <li>Error handling with proper types</li>
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
            name: "useQueries",
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
            Handle multiple queries efficiently, either in parallel or as
            dependent queries.
          </p>
          <MultipleQueriesReact />
        </div>
      </CodeExample>
    </div>
  );
}
