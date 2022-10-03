import React, { createRef, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { GoTriangleRight } from "react-icons/go";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { accordion, accordionDetail, accordionItem } from "./styles";

import "./PractiseAccordion.scss";
import { useState } from "react";

// accordion component
const Accordion = styled((props) => (
  <MuiAccordion elevation={0} square {...props} />
))(accordion);

// accordion item-button component
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<GoTriangleRight />} {...props} />
))(accordionItem);

// accordion detail component
const AccordionDetails = styled(MuiAccordionDetails)(accordionDetail);

export const AccordionItem = ({ item }) => {
  const itemMenu = useRef(null);

  useEffect(() => {
    itemMenu.current.innerHTML = item || "";
  });

  return (
    <li className="list__item" ref={itemMenu}>
      {item}
    </li>
  );
};

const PractiseAccordion = ({
  title,
  className,
  children,
  answer,
  collapse,
  setCollapse,
}) => {
  // practise accordion state
  const titleMenu = useRef(null);
  const text = useRef(null);

  const [expanded, setExpanded] = React.useState("accordion-main");

  // is answer accordion expand variable
  let isAnswer = `accordion${!!className ? "-main" : "-asnwer"}`;

  // practise accordion handler
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (collapse) {
      setExpanded("");
      setCollapse(false);
    }
    if (answer?.element === "text") {
      text.current.innerHTML = answer?.content || "";
    }
    if (answer?.element === "menu") {
      titleMenu.current.innerHTML = answer?.content?.title || "";
    }
  });

  return (
    <Accordion
      expanded={expanded === isAnswer}
      onChange={handleChange(isAnswer)}
      className={`${className || "practise__answer"} practise__accordion`}
    >
      <AccordionSummary className="accordion__title">
        <h3 className="title__text">{title ? title : "Answer"}</h3>
      </AccordionSummary>
      <AccordionDetails className="accordion__body">
        {children ? (
          children
        ) : answer.element === "text" ? (
          <p className="detail__text" ref={text}>
            {answer.content}
          </p>
        ) : (
          <div className="detail__menu">
            <h4 className="menu__title" ref={titleMenu}>
              {answer.content.title}
            </h4>
            <ul className="menu__list">
              {answer.content.items.map((item, idx) => (
                <AccordionItem item={item} key={idx} />
              ))}
            </ul>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default PractiseAccordion;
