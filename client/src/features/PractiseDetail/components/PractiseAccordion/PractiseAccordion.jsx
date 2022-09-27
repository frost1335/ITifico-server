import React from "react";
import { styled } from "@mui/material/styles";
import { GoTriangleRight } from "react-icons/go";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { accordion, accordionDetail, accordionItem } from "./styles";

import "./PractiseAccordion.scss";

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

const PractiseAccordion = ({ title, className, children, answer }) => {
  // practise accordion state
  const [expanded, setExpanded] = React.useState("accordion-main");

  // is answer accordion expand variable
  let isAnswer = `accordion${!!className ? "-main" : "-asnwer"}`;

  // practise accordion handler
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const detailContent = () => {
    if (answer.element === "text") {
      return <p className="detail__text">{answer.content}</p>;
    }
    if (answer.element === "menu") {
      return (
        <div className="detail__menu">
          <h4 className="menu__title">{answer.content.title}</h4>
          <ul className="menu__list">
            {answer.content.items.map((item, idx) => (
              <li className="list__item" key={idx + "detail-menu-item"}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

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
        {children ? children : detailContent()}
      </AccordionDetails>
    </Accordion>
  );
};

export default PractiseAccordion;
