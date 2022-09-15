import React from "react";

import "./TextBlock.scss";

const TextBlock = ({ data }) => {
  return (
    <div className="text__block">
      <p>{data.content}</p>
    </div>
  );
};

export default TextBlock;
