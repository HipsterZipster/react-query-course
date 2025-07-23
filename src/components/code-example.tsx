import React from "react";
import {
  CodeIcon,
  PlayIcon,
  // ExpandIcon,
  // CompressIcon,
  CollapseContentIcon,
  ExpandContentIcon,
  FullScreenIcon,
  ExitFullScreenIcon,
} from "./icons";

interface CodeFile {
  readonly name: string;
  readonly code: string;
  readonly language: string;
}

interface CodeExampleProps {
  readonly children: React.ReactNode;
  readonly code: readonly CodeFile[];
  readonly title?: string;
}

export function CodeExample({
  children,
  code,
  title,
}: CodeExampleProps): React.ReactElement {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [showExample, setShowExample] = React.useState(true);
  const [showCode, setShowCode] = React.useState(true);

  const activeCodeFile = code[activeTab];

  // Toggle panel visibility functions
  const toggleExample = (): void => setShowExample(!showExample);
  const toggleCode = (): void => setShowCode(!showCode);

  // Calculate panel widths based on visibility
  const getExampleWidth = (): string => {
    if (!showCode) return "w-full";
    if (!showExample) return "w-0 hidden";
    return "md:w-1/2";
  };

  const getCodeWidth = (): string => {
    if (!showExample) return "w-full";
    if (!showCode) return "w-0 hidden";
    return "md:w-1/2";
  };

  // Function to add line numbers to code
  const addLineNumbers = (code: string): string => {
    const lines = code.split("\n");
    const maxLineNumber = lines.length;
    const lineNumberWidth = maxLineNumber.toString().length;

    return lines
      .map((line, i) => {
        const lineNumber = (i + 1).toString().padStart(lineNumberWidth, " ");
        return `<span class="line-number" style="color: #6b7280; margin-right: 1em; user-select: none; display: inline-block; width: ${lineNumberWidth + 1}ch; text-align: right;">${lineNumber}</span>${line}`;
      })
      .join("\n");
  };

  // Function to highlight code with Prism
  const highlightCode = React.useCallback(
    (code: string, language: string): string => {
      // Only run on client side
      if (typeof window === "undefined") {
        return addLineNumbers(code);
      }

      // Clean and normalize the code first
      const cleanCode = code
        .trim() // Remove leading/trailing whitespace
        .replace(/\t/g, "  "); // Convert tabs to 2 spaces for consistency

      // Dynamically import Prism only on client side
      let highlightedCode = cleanCode;
      try {
        // Access Prism from window global
        const Prism = (window as any).Prism;
        if (Prism) {
          // Default to typescript if language is not supported
          const lang = Prism.languages[language] ? language : "typescript";
          highlightedCode = Prism.highlight(
            cleanCode,
            Prism.languages[lang],
            lang
          );
        }
        return addLineNumbers(highlightedCode);
      } catch (error) {
        console.error("Error highlighting code:", error);
        return addLineNumbers(cleanCode);
      }
    },
    []
  );

  // Effect to highlight code when tab changes and load Prism
  React.useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Dynamically import Prism
    const loadPrism = async (): Promise<void> => {
      if (!(window as any).Prism) {
        try {
          await import("prismjs");
          await import("prismjs/components/prism-typescript");
          await import("prismjs/components/prism-jsx");
          await import("prismjs/components/prism-tsx");
          // @ts-ignore - Prism.js component imports don't have type definitions
          await import("prismjs/components/prism-javascript");
          // @ts-ignore - Prism.js component imports don't have type definitions
          await import("prismjs/components/prism-css");
          // @ts-ignore - Prism.js component imports don't have type definitions
          await import("prismjs/components/prism-markup");
          // @ts-ignore - Prism.js component imports don't have type definitions
          await import("prismjs/components/prism-json");
        } catch (error) {
          console.error("Failed to load Prism:", error);
        }
      }

      // Update all code elements with the cyberpunk-code class
      const codeElements = document.querySelectorAll(".cyberpunk-code code");
      codeElements.forEach((element) => {
        if (activeCodeFile && element) {
          element.innerHTML = highlightCode(
            activeCodeFile.code,
            activeCodeFile.language
          );
        }
      });
    };

    loadPrism();
  }, [activeCodeFile, highlightCode, isFullScreen]);

  const codePane = (
    <div className="bg-gray-900 rounded-lg flex flex-col h-full border border-cyan-500">
      <div className="flex-shrink-0 p-3 bg-gray-800 rounded-t-lg flex justify-between items-center border-b border-cyan-500">
        <div className="flex items-center space-x-2 flex-wrap">
          {code.map((file, index) => (
            <button
              key={file.name}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-1 text-sm rounded-md mb-1 ${
                activeTab === index
                  ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-cyan-300"
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleExample}
            className="p-1 text-cyan-300 hover:text-cyan-100 hover:bg-gray-700 rounded-full"
            title={showCode ? "Expand Code" : "Collapse Code"}
          >
            {showCode ? <ExpandContentIcon /> : <CollapseContentIcon />}
          </button>
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1 text-cyan-300 hover:text-cyan-100 hover:bg-gray-700 rounded-full"
            title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullScreen ? <ExitFullScreenIcon /> : <FullScreenIcon />}
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <pre
          className={`language-${activeCodeFile.language} h-full cyberpunk-code ${isFullScreen ? "fullscreen-code" : ""}`}
        >
          <code
            className={`language-${activeCodeFile.language}`}
            dangerouslySetInnerHTML={{
              __html: highlightCode(
                activeCodeFile.code,
                activeCodeFile.language
              ),
            }}
          />
        </pre>
      </div>
    </div>
  );

  const examplePane = (
    <div className="border border-fuchsia-500 rounded-lg flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex-shrink-0 p-3 bg-fuchsia-900/20 rounded-t-lg flex justify-between items-center border-b border-fuchsia-500">
        <div className="font-medium text-fuchsia-500 flex items-center">
          <PlayIcon width={16} height={16} className="mr-2" />
          Live Example
        </div>
        <button
          onClick={toggleCode}
          className="p-1 text-fuchsia-400 hover:text-fuchsia-300 hover:bg-fuchsia-900/30 rounded-full"
          title={showCode ? "Expand Live Example" : "Collapse Live Example"}
        >
          {showCode ? <ExpandContentIcon /> : <CollapseContentIcon />}
        </button>
      </div>
      <div className="flex-grow p-4 overflow-auto">{children}</div>
    </div>
  );

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-50 p-4 border-4 border-cyan-500">
        {codePane}
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900 p-6 border border-cyan-500 dark:border-fuchsia-500 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-cyan-300">
        <span className="border-b-2 border-fuchsia-500 pb-1">{title}</span>
      </h2>
      <div
        className="flex flex-col md:flex-row gap-6"
        style={{ height: "600px" }}
      >
        {showExample && (
          <div className={`transition-all duration-300 ${getExampleWidth()}`}>
            {examplePane}
          </div>
        )}
        {showCode && (
          <div className={`transition-all duration-300 ${getCodeWidth()}`}>
            {codePane}
          </div>
        )}
      </div>
    </section>
  );
}
