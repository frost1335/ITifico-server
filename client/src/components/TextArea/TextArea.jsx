import React from "react";

import "./TextArea.scss";

const TextArea = ({ onChange, value, name, placeholder, row = "10" }) => {
  return (
    <textarea
      className="textarea__input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={row}
    >
      {value}
    </textarea>
  );
};

export default TextArea;
