import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { accordion, accordionItem } from "./styles";

import "./Sidebar.scss";
import { useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { useGetListQuery } from "../../../../services/courseApi";
import { useSelector } from "react-redux";
import { useGetLessonQuery } from "../../../../services/lessonApi";

// accordion component
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(accordion);

// accordion item-button component
export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<GoTriangleRight />} {...props} />
))(accordionItem);

// accordion detail component
export const AccordionDetails = styled(MuiAccordionDetails)({});

const Sidebar = ({ setNumber }) => {
  const navigate = useNavigate();
  const { courseId, unitName, lessonId } = useParams();
  const { data: units, isLoading, refetch } = useGetListQuery(courseId);
  const [sidebarExpended, setSidebarExpended] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { lng } = useSelector((state) => state.lngDetect);

  // sidebar accordion state
  const [expanded, setExpanded] = React.useState("");
  const [menuList, setMenuList] = React.useState("");

  // sidebar accordion handler
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const hanleMenuChange = (panel) => (event, newExpanded) => {
    setMenuList(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (unitName && lessonId && !isLoading) {
      setExpanded(unitName);

      units?.data?.forEach((unit, index) => {
        if (unit["name-en"] === unitName) {
          unit?.lessons?.forEach((lesson, idx) => {
            if (lesson?._id === lessonId)
              setNumber({ index: index + 1, idx: idx + 1 });
          });
        }
      });
    }
    refetch();
  }, [isLoading, lessonId, unitName, courseId, units, navigate, setNumber]);

  useEffect(() => {}, [unitName, lessonId, isLoading]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (windowWidth > 1024) {
      setMenuList("menu-sidebar-list");
    } else {
      setMenuList("");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (menuList === "menu-sidebar-list" && windowWidth < 1024) {
      setSidebarExpended(true);
      document.querySelector("body").style.overflow = "hidden";
    } else {
      setSidebarExpended(false);
      document.querySelector("body").style.overflow = "unset";
    }
  }, [menuList, windowWidth]);

  if (isLoading) return "Loading...";

  return (
    <div className="sidebar__box">
      <div className="course__sidebar">
        <div
          className={`sidebar__bg ${sidebarExpended ? " fixed" : ""}`}
          onClick={hanleMenuChange("menu-sidebar-list")}
        />
        <Accordion
          expanded={menuList === "menu-sidebar-list"}
          onChange={hanleMenuChange("menu-sidebar-list")}
          key={"menu-sidebar-list"}
          className="menu-sidebar-list"
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="sidebar-menu-list"
          >
            <Typography>Menu Sidebar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {units?.data?.length ? (
              units?.data?.map((unit, idx) => (
                <Accordion
                  expanded={
                    expanded === unit["name-en"].replace("#", "").trim()
                  }
                  onChange={handleChange(
                    unit["name-en"].replace("#", "").trim()
                  )}
                  className="sidebar__item"
                  key={unit?.["name-en"] + idx}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className="item__title"
                  >
                    <Typography className="title__text">
                      {" "}
                      {unit?.[`name-${lng}`]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="item__body">
                    <ol className="body__menu">
                      {unit?.lessons?.length ? (
                        unit?.lessons?.map((lesson, index) => (
                          <li
                            className="menu__item"
                            key={index + "lesson-item"}
                          >
                            <NavLink
                              className={
                                lessonId === lesson._id ? "active" : ""
                              }
                              to={`/courses/view/${courseId}/${
                                lesson._id
                              }/${unit[`name-en`].trim().replace("#", "")}`}
                            >
                              {lesson[lng]}
                            </NavLink>
                          </li>
                        ))
                      ) : (
                        <p>Lessons not found</p>
                      )}
                    </ol>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <p>Items not found</p>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
