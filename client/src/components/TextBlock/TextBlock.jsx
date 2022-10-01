import React, { useRef } from "react";
import { useEffect } from "react";

import "./TextBlock.scss";

const TextBlock = ({ data }) => {
  const text = useRef(null);
  const title = useRef(null);

  useEffect(() => {
    text.current.innerHTML = data.content || "";
    title.current.innerHTML = data.title || "";
  });

  return (
    <div className="text__block">
      <h2 ref={title}>{data.title || ""}</h2>
      <p ref={text} />
    </div>
  );
};

export default TextBlock;
