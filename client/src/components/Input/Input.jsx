import React from "react";
import './Input.scss'

const Input = ({ type="text", placeholder, value, onChange }) => {
  return (
    <input
      className="form__input"
      type={type}
      placeholder={placeholder || ""}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
