import React, { useRef } from "react";
import { useEffect } from "react";
import QuoteIcon from "../QuoteIcon/QuoteIcon";

import "./QuoteBlock.scss";

const QuoteBlock = ({ data }) => {
  return (
    <div className="quote__block">
      <div className="quoto__icon">
        <QuoteIcon />
      </div>
      <div className="quote__content">
        <div className="quote__name" />
        <p className="quote__text" />
      </div>
    </div>
  );
};

export default QuoteBlock;
