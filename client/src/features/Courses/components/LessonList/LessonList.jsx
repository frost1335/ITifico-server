import React, { useEffect, useState } from "react";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, SelectOption } from "../../../../components";
import { useGetCoursesQuery } from "../../../../services/courseApi";
import {
  useDeleteLessonMutation,
  useGetLessonsQuery,
} from "../../../../services/lessonApi";

import "./LessonList.scss";

const LessonList = () => {
  const navigate = useNavigate();
  const { data: lessons, isLoading } = useGetLessonsQuery();
  const { data: courseList, isLoading: courseLoading } = useGetCoursesQuery();
  const { lng } = useSelector((state) => state.lngDetect);
  const [deleteLesson] = useDeleteLessonMutation();

  const [lessonsList, setLessonsList] = useState({});
  const [themesMenu, setThemesMenu] = useState([]);
  const [course, setCourse] = useState("null");
  const [theme, setTheme] = useState("null");
  const getCourse = (id) => {
    if (!courseLoading && courseList?.data?.length) {
      return courseList?.data?.find((c) => c._id === id)?.[lng]?.title;
    }
    return "Not found";
  };

  useEffect(() => {
    if (!isLoading) {
      setLessonsList({ ...lessons });
    }
  }, [isLoading, lessons]);

  const onFilterChangeCourse = (event) => {
    setCourse(event.target.value);
    let filteresLessons;

    let themes =
      courseList?.data?.find((c) => c._id === event.target.value)?.en?.themes ||
      [];

    if (event.target.value !== "null") {
      filteresLessons = lessons?.data.filter(
        (lesson) => lesson.courseId === event.target.value
      );
    } else {
      filteresLessons = lessons?.data;
    }

    setTheme("");
    setLessonsList({ success: true, data: [...filteresLessons] });
    setThemesMenu([...themes]);
  };

  const onFilterChangeTheme = (event) => {
    let filteresLessons;
    if (event.target.value !== "null") {
      filteresLessons = lessons?.data.filter(
        (lesson) =>
          lesson.en.theme === event.target.value && lesson.courseId === course
      );
    } else {
      filteresLessons = lessons?.data;
    }
    setTheme(event.target.value);
    setLessonsList({ success: true, data: [...filteresLessons] });
  };

  return (
    <div className="lesson__list">
      <h2>Lessons List</h2>
      <div className="list__filter">
        <div className="input__group">
          <SelectOption
            title={"Select Course"}
            value={course}
            arr={courseList?.data}
            disabled={courseLoading}
            isLoading={courseLoading}
            onChange={(event) => onFilterChangeCourse(event)}
          />
        </div>
        <div className="input__group">
          <SelectOption
            title={"Select Lesson"}
            value={theme}
            arr={themesMenu}
            disabled={course === "null"}
            isLoading={courseLoading}
            onChange={(event) => onFilterChangeTheme(event)}
          />
        </div>
      </div>
      <table className="table__menu">
        <thead>
          <tr>
            <th>№</th>
            <th>Course Title</th>
            <th>Lesson Title </th>
            <th>Theme</th>
            <th>Btns</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            "Loading..."
          ) : lessonsList?.data?.length ? (
            lessonsList?.data?.map((lesson, index) => (
              <tr className="menu__item">
                <td className="numeric">
                  <p>{index + 1}.</p>
                </td>
                <td>
                  <Link to={`/courses/view/${lesson?.courseId}`}>
                    {getCourse(lesson?.courseId)}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/courses/view/${lesson?.courseId}/${
                      lesson._id
                    }/${lesson?.["en"].theme.replace("#", "").trim()}`}
                  >
                    {lesson[lng].title}
                  </Link>
                </td>
                <td>{lesson[lng].theme}</td>
                <td className="item__buttons">
                  <Button
                    onClick={() =>
                      navigate(`/courses/lessons/form?lessonId=${lesson._id}`)
                    }
                  >
                    <RiEditLine />
                  </Button>
                  <Button onClick={() => deleteLesson(lesson._id)}>
                    <RiDeleteBinLine />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <td>Lessons not found</td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LessonList;
