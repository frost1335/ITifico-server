import React from "react";
import { Container } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

import "./Content.scss";
import { Button } from "../../../../components";

const Content = () => {
 
  return (
    <div className="articles__list">
      <Container maxWidth={"xl"}>
        <div className="header__navigation">
          <ul className="navigation__menu">
            <li className="menu__item">
              <Button>
                <NavLink to="/articles">Articles List</NavLink>
              </Button>
            </li>
            <li className="menu__item">
              <Button>
                <NavLink to="/articles/form">Article Form</NavLink>
              </Button>
            </li>
          </ul>
        </div>
        <div className="content__body">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default Content;
