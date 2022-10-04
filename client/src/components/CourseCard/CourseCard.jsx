import { Button } from "@mui/material";
import React from "react";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { defaultIcon } from "../../assets";
import { useImgExsist } from "../../hooks/useImgExsist";
import { useDeleteCourseMutation } from "../../services/courseApi";

import "./CourseCard.scss";

const CourseCard = ({ course }) => {
  const iconExsist = useImgExsist(course?.icon);
  const [deleteCourse] = useDeleteCourseMutation();
  const navigate = useNavigate();
  const { lng } = useSelector((state) => state.lngDetect);

  if (!course) return "Loading...";

  return (
    <div className="course__card">
      <div className="course__buttons">
        <Button
          onClick={() => navigate(`/courses/form?courseId=${course?._id}`)}
        >
          <RiEditLine />
        </Button>
        <Button onClick={() => deleteCourse(course?._id)}>
          <RiDeleteBinLine />
        </Button>
      </div>
      <div className="card__content" style={{ background: course?.background }}>
        <div className="card__icon">
          <img
            src={
              iconExsist
                ? process.env.REACT_APP_BASE_URL + "/Uploads/" + course?.icon
                : defaultIcon
            }
            alt="course-icon"
          />
        </div>
        <h3 className="card__title">{course[lng]?.title}</h3>
        <p className="card__text">
          <span>{course[lng]?.description.substring(0, 85)}</span>
          <span className="text__dots">...</span>{" "}
          <span className="text__extra">
            {course[lng]?.description.length > 160
              ? `${course[lng]?.description.substring(85, 160)}...`
              : course[lng]?.description.substring(85, 160)}
          </span>
        </p>
        <div className="card__bottom">
          <Link to={`/courses/view/${course._id}`} className="course__detail">
            Детальніше
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
