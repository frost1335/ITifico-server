import React from "react";
import QuoteIcon from "../QuoteIcon/QuoteIcon";

import "./QuoteBlock.scss";

const QuoteBlock = ({ data }) => {
  console.log(data);

  return (
    <div className="quote__block">
      <div className="quoto__icon">
        <QuoteIcon />
      </div>
      <div className="quote__content">
        <div className="quote__name">{data.content.title}</div>
        <p className="quote__text">{data.content.description}</p>
      </div>
    </div>
  );
};

export default QuoteBlock;
