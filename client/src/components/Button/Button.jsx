import React from "react";
import "./Button.scss";

const Button = ({ onClick, type = "button", children, disabled = false }) => {
  return (
    <button
      className="form__button"
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
