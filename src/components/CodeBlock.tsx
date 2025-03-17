import React, { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

// 사용할 언어들 등록
SyntaxHighlighter.registerLanguage("tsx", tsx);

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
};

export function CodeBlock({
  code,
  language = "tsx",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        {filename && <span className="filename">{filename}</span>}
        <span className="language-label">{language}</span>
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button className="copy-button">
            {copied ? (
              <>
                <span className="copy-icon">✓</span> 복사됨
              </>
            ) : (
              <>
                <span className="copy-icon">📋</span> 복사
              </>
            )}
          </button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={true}
        wrapLines={true}
        customStyle={{
          margin: 0,
          borderRadius: "0 0 6px 6px",
          fontSize: "14px",
        }}
        lineNumberStyle={{
          minWidth: "3em",
          paddingRight: "1em",
          color: "#606366",
          borderRight: "1px solid #404040",
        }}
      >
        {code}
      </SyntaxHighlighter>

      <style jsx>{`
        .code-block-wrapper {
          margin: 1.5rem 0;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          background: #1e1e1e;
          border: 1px solid #333;
        }

        .code-block-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: #2d2d2d;
          color: #e6e6e6;
          font-family: monospace;
          border-bottom: 1px solid #404040;
        }

        .filename {
          font-weight: 500;
          margin-right: auto;
        }

        .language-label {
          text-transform: uppercase;
          font-size: 0.8rem;
          font-weight: bold;
          background: #404040;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          margin-right: 0.75rem;
        }

        .copy-button {
          display: flex;
          align-items: center;
          gap: 6px;
          background: ${copied ? "#4CAF50" : "#4a4a4a"};
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.3rem 0.75rem;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s ease;
        }

        .copy-button:hover {
          background: ${copied ? "#43A047" : "#5a5a5a"};
        }

        .copy-icon {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
