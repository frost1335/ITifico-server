import React, { useEffect } from "react";
import { useState } from "react";

import "./Sidebar.scss";
import { useGetTagsQuery } from "../../../../services/tagApi";
import { useGetCoursesQuery } from "../../../../services/courseApi";
import { CourseCard } from "../../../../components";
import Tag from "../../../../components/Tag/Tag";

const Sidebar = () => {
  const { data: tags, isLoading: loadingTags } = useGetTagsQuery();
  const { data: courses, isLoading: loadingCourse } = useGetCoursesQuery();
  const [course, setCourse] = useState({});

  useEffect(() => {
    if (!loadingCourse && courses?.data?.length) {
      let randomCourse =
        courses?.data?.[Math.floor(Math.random() * courses?.data?.length)];
      setCourse(randomCourse);

      console.log(randomCourse, courses?.data?.length);
    }
  }, [loadingCourse, courses]);

  console.log(course);

  return (
    <div className="blog__sidebar">
      <div className="sidebar__content">
        <div className="sidebar__category">
          <h3 className="category__title">{"Categories"}</h3>
          <div className="category__tags">
            {loadingTags ? (
              "Loading..."
            ) : tags?.data?.length ? (
              tags?.data?.map((tag, idx) => <Tag tag={tag} key={"teg" + idx} />)
            ) : (
              <p>Tags not found</p>
            )}
          </div>
        </div>
        <div className="sidebar__course">
          <h3 className="course__title">{"Courses"}</h3>
          <div className="course__box">
            <CourseCard course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
