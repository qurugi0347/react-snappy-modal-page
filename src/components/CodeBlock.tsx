import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/a11y-dark";

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

SyntaxHighlighter.registerLanguage("tsx", tsx);

type CodeBlockProps = {
  code: string;
};

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="code-block-container">
      <div className="code-header">
        <span>{"tsx"}</span>
        <CopyToClipboard text={code}>
          <button>Copy</button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter
        language={tsx}
        style={vscDarkPlus}
        showLineNumbers={true}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
