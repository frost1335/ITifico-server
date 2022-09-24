import React from "react";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../components";
import { useGetCoursesQuery } from "../../../../services/courseApi";
import {
  useDeleteLessonMutation,
  useGetLessonsQuery,
} from "../../../../services/lessonApi";

import "./LessonList.scss";

const LessonList = () => {
  const navigate = useNavigate();
  const { data: lessonsList, isLoading } = useGetLessonsQuery();
  const { data: courseList, isLoading: courseLoading } = useGetCoursesQuery();
  const { lng } = useSelector((state) => state.lngDetect);
  const [deleteLesson] = useDeleteLessonMutation();

  const getCourse = (id) => {
    if (!courseLoading && courseList?.data?.length) {
      return courseList?.data?.find((c) => c._id === id)?.[lng]?.title;
    }
    return "Not found";
  };

  return (
    <div className="lesson__list">
      <h2>Lessons List</h2>
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
                  <Link to={`/courses/lessons/view/${lesson._id}`}>
                    {lesson[lng].title}
                  </Link>
                </td>
                <td>{lesson.theme}</td>
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
