import React, { useEffect, useRef } from "react";
import "./CodeBlock.scss";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierForestLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./CodeBlock.scss";

const highlighterStyles = {
  padding: "0 13px",
  background: "#F7F8FA",
  fontFamily: "Consolas",
  fontWeight: 400,
};
const highlighterLineNumbersStyles = {
  color: "#A0A1A6",
  padding: "4px 12px 4px 0",
  marginRight: 10,
  borderRight: "2px solid #75B687",
};

const CodeBlock = ({ data }) => {
  const title = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    title.current.innerHTML = data.title || "";
    text.current.innerHTML = data.text || "";
  });

  return (
    <div className="code__block">
      <h2 className="code__title" ref={title}>
        {data.title}
      </h2>
      <p ref={text} />
      <SyntaxHighlighter
        className="question__code"
        customStyle={highlighterStyles}
        showLineNumbers={true}
        lineNumberStyle={highlighterLineNumbersStyles}
        language={data.language}
        style={atelierForestLight}
      >
        {`${data.content}`}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
