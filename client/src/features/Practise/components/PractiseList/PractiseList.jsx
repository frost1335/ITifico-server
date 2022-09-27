import React from "react";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../components";
import { useGetLessonsQuery } from "../../../../services/lessonApi";
import {
  useDeletePractiseMutation,
  useGetPractisesQuery,
} from "../../../../services/practiseApi";

import "./PractiseList.scss";

const PractiseList = () => {
  const navigate = useNavigate();
  const { lng } = useSelector((state) => state.lngDetect);

  const [deletePractise] = useDeletePractiseMutation();
  const { data: practiseList, isLoading: practiseLoading } =
    useGetPractisesQuery();
  const { data: lessonList, isLoading: lessonLoading } = useGetLessonsQuery();

  const getLesson = (lessonId) => {
    if (!lessonLoading && lessonList?.data?.length) {
      return lessonList?.data?.find((c) => c._id === lessonId);
    }
    return "Not found";
  };

  return (
    <div className="practise__list">
      <h2>Practise List</h2>
      <table className="table__menu">
        <thead>
          <tr>
            <th>№</th>
            <th>Lesson Title</th>
            <th>Practise</th>
            <th>Btns</th>
          </tr>
        </thead>
        <tbody>
          {practiseLoading || lessonLoading ? (
            "Loading..."
          ) : practiseList?.data?.length ? (
            practiseList?.data?.map((practise, index) => (
              <tr className="menu__item">
                <td className="numeric">
                  <p>{index + 1}.</p>
                </td>
                <td>
                  <Link
                    to={`/courses/view/${
                      getLesson(practise?.lessonId)?.courseId
                    }/${practise?.lessonId}/${getLesson(practise?.lessonId)
                      ?.["en"].theme.trim()
                      .replace("#", "")}`}
                  >
                    {getLesson(practise?.lessonId)?.[lng].title}
                  </Link>
                </td>
                <td>
                  <Link to={`/courses/practise/view/${practise._id}`}>
                    View Detail...
                  </Link>
                </td>
                <td className="item__buttons">
                  <Button
                    onClick={() =>
                      navigate(
                        `/courses/practise/form?practiseId=${practise._id}`
                      )
                    }
                  >
                    <RiEditLine />
                  </Button>
                  <Button onClick={() => deletePractise(practise._id)}>
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

export default PractiseList;
