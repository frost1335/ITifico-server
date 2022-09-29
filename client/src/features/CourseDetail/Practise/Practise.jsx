import React from "react";
import { Link, useParams } from "react-router-dom";

import "./Practise.scss";
import { useSelector } from "react-redux";
import { useGetByLessonQuery } from "../../../services/practiseApi";
import PractiseAccordion from "../../PractiseDetail/components/PractiseAccordion/PractiseAccordion";
import PractiseQuestion from "../../PractiseDetail/components/PractiseQuestion/PractiseQuestion";
import Loader from "../../../components/Loader/Loader";

const Practise = () => {
  const { lessonId } = useParams();
  const { data: practise, isLoading } = useGetByLessonQuery(lessonId);
  const { lng } = useSelector((state) => state.lngDetect);

  if (isLoading) return <Loader />;
  if (!practise?.data && !isLoading)
    return "There is no practise in this lesson";

  return (
    <div className="course__practise">
      <PractiseAccordion title={"Practice"} className="practise__container">
        {isLoading ? (
          "Loading..."
        ) : practise?.data ? (
          practise?.data?.[lng].fields.map((field, index) => (
            <React.Fragment key={index + "practise-fields"}>
              <PractiseQuestion question={field.question} index={index} />
              <PractiseAccordion answer={field.answer} />
            </React.Fragment>
          ))
        ) : (
          <p>Practise items not found</p>
        )}
        <div className="container__bottom">
          <Link to="#less" className="bottom__link">
            Collapse
          </Link>
        </div>
      </PractiseAccordion>
    </div>
  );
};

export default Practise;
