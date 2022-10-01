import React, { useRef } from "react";
import { useEffect } from "react";
import QuoteIcon from "../QuoteIcon/QuoteIcon";

import "./QuoteBlock.scss";

const QuoteBlock = ({ data }) => {
  const title = useRef(null);
  const description = useRef(null);

  useEffect(() => {
    title.current.innerHTML = data?.content?.title || "";
    description.current.innerHTML = data?.content?.description || "";
  });

  return (
    <div className="quote__block">
      <div className="quoto__icon">
        <QuoteIcon />
      </div>
      <div className="quote__content">
        <div className="quote__name" ref={title}>
          {data?.content?.title || ""}
        </div>
        <p className="quote__text" ref={description}>
          {data?.content?.description || ""}
        </p>
      </div>
    </div>
  );
};

export default QuoteBlock;
