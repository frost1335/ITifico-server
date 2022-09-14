import React from "react";

import "./Tag.scss";

const Tag = ({ tag, article }) => {
  return (
    <div
      className={`tag__content ${article && "tag__content--article"}`}
      style={{ background: tag.background }}
    >
      {tag.name}
    </div>
  );
};

export default Tag;
