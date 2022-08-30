import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const Layout = () => {
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
