import React from "react";

import "./Upload.scss";

const Upload = ({ value, onChange, placeholder }) => {
  return (
    <div className="upload__box">
      <input type="file" className="form__upload" onChange={onChange} />
      <input
        type="text"
        placeholder={placeholder}
        className="upload__input"
        value={value}
      />
    </div>
  );
};

export default Upload;
