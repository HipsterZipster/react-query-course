import * as React from "react";

interface CodeComparisonProps {
  readonly title: string;
  readonly beforeCode: string;
  readonly afterCode: string;
  readonly beforeTitle?: string;
  readonly afterTitle?: string;
}

/**
 * Reusable code comparison component that shows expandable before/after code samples
 * with syntax highlighting using Prism.js
 */
export function CodeComparison({ 
  title, 
  beforeCode, 
  afterCode, 
  beforeTitle = "❌ Vanilla React", 
  afterTitle = "✅ React Query" 
}: CodeComparisonProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  // Memoize highlighted code to prevent unnecessary re-renders
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
  
  // Load Prism.js and required language components on mount
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
