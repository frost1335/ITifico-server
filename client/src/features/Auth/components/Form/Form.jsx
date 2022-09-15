import { Alert, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/actions";

import "./Form.scss";

const Form = () => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const { authForm } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authorization") === "authen") {
      navigate("/articles");
    }
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (key === process.env.REACT_APP_AUTH_KEY) {
      localStorage.setItem("authorization", "authen");
      authForm("authen");
      navigate("/articles");
    } else {
      setError("Key is not defined");
    }
  };

  return (
    <div className="auth__box">
      <div className="toastify">
        {error && (
          <Alert variant="outlined" severity="error">
            Key is not valid
          </Alert>
        )}
      </div>
      <form className="auth__form" onSubmit={onSubmitHandler}>
        <Typography variant="h3">Enter key to login</Typography>
        <TextField
          id="outlined-basic"
          label="Auth key"
          variant="outlined"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <Button variant="outlined" type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Form;
