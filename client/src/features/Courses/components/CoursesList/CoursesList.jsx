import { Typography } from "@mui/material";
import React from "react";
import { CourseCard } from "../../../../components";
import { useGetCoursesQuery } from "../../../../services/courseApi";

import "./CoursesList.scss";

const CoursesList = () => {
  const { data: coursesList, isLoading } = useGetCoursesQuery();

  return (
    <div className="courses__list">
      <Typography
        id="modal-modal-title"
        variant="h3"
        component="h2"
        marginBottom={4}
      >
        Courses list
      </Typography>
      <div className="list__menu">
        {isLoading ? (
          "Loading..."
        ) : coursesList?.data?.length ? (
          coursesList?.data?.map((course, index) => (
            <CourseCard course={course} key={index + "course"} />
          ))
        ) : (
          <p>Courses not found</p>
        )}
      </div>
    </div>
  );
};

export default CoursesList;
