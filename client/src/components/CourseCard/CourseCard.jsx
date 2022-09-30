import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteCourseMutation } from "../../services/courseApi";

import "./CourseCard.scss";

const CourseCard = ({ course }) => {
  const description1 = useRef(null);
  const description2 = useRef(null);

  const [deleteCourse] = useDeleteCourseMutation();
  const navigate = useNavigate();
  const { lng } = useSelector((state) => state.lngDetect);

  useEffect(() => {
    description2.current.innerHTML =
      course[lng]?.description.length > 160
        ? `${course[lng]?.description.substring(85, 160)}...`
        : course[lng]?.description.substring(85, 160);
    description1.current.innerHTML = course[lng]?.description.substring(0, 85);
  }, [course, lng]);

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
            src={process.env.REACT_APP_BASE_URL + "/Uploads/" + course?.icon}
            alt="course-icon"
          />
        </div>
        <h3 className="card__title">{course[lng]?.title}</h3>
        <p className="card__text">
          <span ref={description1}>
            {course[lng]?.description.substring(0, 85)}
          </span>
          <span className="text__dots">...</span>{" "}
          <span className="text__extra" ref={description2}>
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
