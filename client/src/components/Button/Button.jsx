import React from "react";
import './Button.scss'

const Button = ({ onClick, type = "button", children }) => {
  return (
    <button className="form__button" type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
