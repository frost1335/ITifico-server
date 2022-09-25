import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { SelectOption } from "../../../../components";
import { useGetCoursesQuery } from "../../../../services/courseApi";

const PractiseForm = () => {
  const { search } = useLocation();
  const practiseId = search.replace("?lessonId=", "");
  const { data: lessonsList, isLoading: lessonLoading } = useGetCoursesQuery();

  const [lessonId, setLessonId] = useState("");
  const [practise, setPractise] = useState({
    language: '',
    en: {},
    uk: {},
  });

  const onChangeLesson = () => {};
  const onChangeLanguage = () => {}

  return (
    <div className="practise__form">
      <h2>Practise Form</h2>
      <div className="form__content">
        <div className="content__main">
          <div className="main__box">
            <h3>EN - forms</h3>
            <div className="input__group">
              {/* <SelectOption
                value={courseId}
                arr={courseList?.data}
                lng="en"
                disabled={courseLoading}
                isLoading={courseLoading}
                onChange={(event) =>
                  onChangeInput({ event, element: "select" })
                }
              /> */}
            </div>
          </div>
          <div className="main__box">
            <h3>EN - forms</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PractiseForm;
