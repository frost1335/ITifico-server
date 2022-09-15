import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authorization") !== "authen") {
      navigate("/auth");
    }
  });

  return (
    <div className="layout">
      <div className="layout__navbar">
        <Navbar />
      </div>
      <div className="layout__content">
        <div className="layout__sidebar"></div>
        <div className="layout__main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
