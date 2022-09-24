import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
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

  const [validationError, setValidationError] = useState(false);
  const [title, setTitle] = useState({ en: "", uk: "" });
  const [description, setDescription] = useState({ en: "", uk: "" });
  const [background, setBackground] = useState("");
  const [icon, setIcon] = useState("");
  const [themesEn, setThemesEn] = useState([]);
  const [themesUk, setThemesUk] = useState([]);
  const [themeInputEn, setThemeInputEn] = useState("");
  const [themeInputUk, setThemeInputUk] = useState("");

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
      setThemesEn(currentCourse?.en?.themes);
      setThemesUk(currentCourse?.uk?.themes);
    }
  }, [isLoading, courseList, courseId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let duplErrEn = themesEn.filter((th, idx) => themesEn.indexOf(th) !== idx);
    let duplErrUk = themesUk.filter((th, idx) => themesUk.indexOf(th) !== idx);

    const formData = new FormData();

    const enData = {
      title: title.en,
      description: description.en,
      themes: themesEn,
    };

    const ukData = {
      title: title.uk,
      description: description.uk,
      themes: themesUk,
    };

    formData.append("icon", icon);
    formData.append("background", background);
    formData.append("en", JSON.stringify(enData));
    formData.append("uk", JSON.stringify(ukData));

    if (
      !duplErrEn.length &&
      !duplErrUk.length &&
      !themesEn.includes("") &&
      !themesUk.includes("") &&
      themesEn.length === themesUk.length
    ) {
      if (courseId) {
        formData.append("_id", courseId);
        editCourse(formData);
      } else {
        createCourse(formData);
      }
    } else {
      setValidationError(true);
    }

    clean();
  };

  const addThemeEn = () => {
    let themesClone = [...themesEn];

    let exsist = themesClone.find((th) => th.trim() === themeInputEn.trim());
    if (themeInputEn && !exsist) {
      themesClone.push(themeInputEn);
    }

    setThemeInputEn("");
    setThemesEn([...themesClone]);
  };

  const addThemeUk = () => {
    let themesClone = [...themesUk];

    let exsist = themesClone.find((th) => th.trim() === themeInputUk.trim());
    if (themeInputUk && !exsist) {
      themesClone.push(themeInputUk);
    }

    setThemeInputUk("");
    setThemesUk([...themesClone]);
  };

  const removeThemeEn = (idx) => {
    let themesClone = [...themesEn];

    themesClone = themesClone.filter((th, index) => index !== idx);

    setThemesEn([...themesClone]);
  };

  const removeThemeUk = (idx) => {
    let themesClone = [...themesUk];

    themesClone = themesClone.filter((th, index) => index !== idx);

    setThemesUk([...themesClone]);
  };

  const clean = () => {
    setTitle({ en: "", uk: "" });
    setDescription({ en: "", uk: "" });
    setThemesEn([]);
    setThemesUk([]);
    setThemeInputEn("");
    setThemeInputUk("");
    setBackground("");
    setIcon("");
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
            <div className="input__list">
              <div className="list__header">
                <h4>Add themes</h4>
                <div className="add_input">
                  <Input
                    value={themeInputEn}
                    placeholder={"Add theme"}
                    onChange={(event) =>
                      setThemeInputEn((prev) => event.target.value)
                    }
                  />
                  <Button onClick={addThemeEn}>add</Button>
                </div>
              </div>
              <ul className="list__menu">
                {themesEn.map((th, idx) => (
                  <li className="menu__item" key={idx}>
                    <Input
                      errorExs="test"
                      error={
                        themesEn?.filter?.((t) => th.trim() === t.trim())
                          ?.length > 1
                      }
                      value={th}
                      onChange={(event) => {
                        let arr = themesEn.map((t, i) =>
                          i === idx ? event.target.value : t
                        );
                        let duplErr = arr.filter(
                          (th, idx) => arr.indexOf(th.trim()) !== idx
                        );
                        setValidationError(arr.includes("") || duplErr.length);
                        setThemesEn([...arr]);
                      }}
                    />
                    <Button onClick={() => removeThemeEn(idx)}>
                      <RiDeleteBinLine />
                    </Button>
                  </li>
                ))}
              </ul>
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
            <div className="input__list">
              <div className="list__header">
                <h4>Add themes</h4>
                <div className="add_input">
                  <Input
                    value={themeInputUk}
                    placeholder={"Add theme"}
                    onChange={(event) =>
                      setThemeInputUk((prev) => event.target.value)
                    }
                  />
                  <Button onClick={addThemeUk}>add</Button>
                </div>
              </div>
              <ul className="list__menu">
                {themesUk.map((th, idx) => (
                  <li className="menu__item" key={idx}>
                    <Input
                      errorExs="test"
                      error={
                        themesUk?.filter?.((t) => th.trim() === t.trim())
                          ?.length > 1
                      }
                      value={th}
                      onChange={(event) => {
                        let arr = themesUk.map((t, i) =>
                          i === idx ? event.target.value : t
                        );
                        let duplErr = arr.filter(
                          (th, idx) => arr.indexOf(th.trim()) !== idx
                        );
                        setValidationError(arr.includes("") || duplErr.length);
                        setThemesUk([...arr]);
                      }}
                    />
                    <Button onClick={() => removeThemeUk(idx)}>
                      <RiDeleteBinLine />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="box__submit">
            <Button
              onClick={onSubmitHandler}
              disabled={validationError || themesEn.length !== themesUk.length}
              style={{ padding: "15px 45px" }}
            >
              {!courseId ? "Create course" : "Edit course"}
            </Button>
            {themesEn.length !== themesUk.length && (
              <p className="error__inputs">Theme inputs are not equal</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
