import React from "react";
import "./Input.scss";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  errorExs,
}) => {
  return (
    <>
      <input
        className={"form__input " + (error ? "error" : "")}
        type={type}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
      />
      {value.trim() === "" && errorExs ? (
        <span className="error__text">Input is empty</span>
      ) : (
        error && <span className="error__text">Input duplicated</span>
      )}
    </>
  );
};

export default Input;
