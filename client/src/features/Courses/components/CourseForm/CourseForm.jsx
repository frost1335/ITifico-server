import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Input, Upload } from "../../../../components";
import {
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetCoursesQuery,
} from "../../../../services/courseApi";

import "./CourseForm.scss";

const CourseForm = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const courseId = search.replace("?courseId=", "");
  const { data: courseList, isLoading } = useGetCoursesQuery();
  const [createCourse] = useCreateCourseMutation();
  const [editCourse] = useEditCourseMutation();

  const [title, setTitle] = useState({ en: "", uk: "" });
  const [description, setDescription] = useState({ en: "", uk: "" });
  const [background, setBackground] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (!isLoading && courseId) {
      const currentCourse = courseList?.data?.find((c) => c._id === courseId);
      setBackground(currentCourse?.background);
      setDescription((p) => ({
        en: currentCourse.en?.description,
        uk: currentCourse.uk?.description,
      }));
      setTitle((p) => ({
        en: currentCourse.en?.title,
        uk: currentCourse.uk?.title,
      }));
      setIcon(currentCourse?.icon);
    }
  }, [isLoading, courseList, courseId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const enData = {
      title: title.en,
      description: description.en,
    };

    const ukData = {
      title: title.uk,
      description: description.uk,
    };

    formData.append("icon", icon);
    formData.append("background", background);
    formData.append("en", JSON.stringify(enData));
    formData.append("uk", JSON.stringify(ukData));

    if (courseId) {
      formData.append("_id", courseId);
      editCourse(formData);
    } else {
      createCourse(formData);
    }

    clean();
  };

  const clean = () => {
    setTitle({ en: "", uk: "" });
    setDescription({ en: "", uk: "" });
    setBackground('');
    setIcon('');
    navigate("/courses/form");
  };

  return (
    <div className="course__form">
      <div className="form__content">
        <h2>Course Form</h2>
        <div className="content__main">
          <div className="main__box">
            <h3>EN - forms</h3>
            <Upload
              value={icon?.name || icon}
              onChange={(event) => setIcon((prev) => event.target.files[0])}
            />
            <div className="input__group">
              <Input
                value={title.en}
                placeholder="Title"
                onChange={(event) =>
                  setTitle((prev) => ({ ...prev, en: event.target.value }))
                }
              />
            </div>
            <div className="input__group">
              <Input
                value={description.en}
                placeholder="Description"
                onChange={(event) =>
                  setDescription((prev) => ({
                    ...prev,
                    en: event.target.value,
                  }))
                }
              />
            </div>
            <div className="input__group">
              <Input
                value={background}
                placeholder="Background"
                onChange={(event) =>
                  setBackground((prev) => event.target.value)
                }
              />
            </div>
          </div>
          <div className="main__box">
            <h3>UK - forms</h3>
            <Upload
              value={icon.name || icon}
              onChange={(event) => setIcon((prev) => event.target.files[0])}
            />
            <div className="input__group">
              <Input
                value={title.uk}
                placeholder="Title"
                onChange={(event) =>
                  setTitle((prev) => ({ ...prev, uk: event.target.value }))
                }
              />
            </div>
            <div className="input__group">
              <Input
                value={description.uk}
                placeholder="Description"
                onChange={(event) =>
                  setDescription((prev) => ({
                    ...prev,
                    uk: event.target.value,
                  }))
                }
              />
            </div>
            <div className="input__group">
              <Input
                value={background}
                placeholder="Background"
                onChange={(event) =>
                  setBackground((prev) => event.target.value)
                }
              />
            </div>
          </div>
          <div className="box__submit">
            <Button onClick={onSubmitHandler} style={{ padding: "15px 45px" }}>
              {!courseId ? "Create course" : "Edit course"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
