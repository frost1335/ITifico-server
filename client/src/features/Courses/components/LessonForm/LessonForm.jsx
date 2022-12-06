import { TextField } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  SelectOption,
  TextArea,
  Upload,
} from "../../../../components";
import { helperTags, langs } from "../../../../constants";
import { useGetCoursesQuery } from "../../../../services/courseApi";
import {
  useCreateImageMutation,
  useEditImageMutation,
  useGetImagesQuery,
} from "../../../../services/imagesApi";
import {
  useCreateLessonMutation,
  useEditLessonMutation,
  useGetLessonsQuery,
} from "../../../../services/lessonApi";

import "./LessonForm.scss";

const LessonForm = () => {
  const { search } = useLocation();
  const lessonId = search.replace("?lessonId=", "");
  const navigate = useNavigate();
  const [imgError, setImgError] = useState({});

  const [freeInput, setFreeInput] = useState("");
  const [createImage] = useCreateImageMutation();
  const [editImage] = useEditImageMutation();
  const [
    createLesson,
    { data, isSuccess: createSuccess, isLoading: createLoading, reset },
  ] = useCreateLessonMutation();
  const [
    editLesson,
    {
      data: editImgData,
      isSuccess: editSuccess,
      isLoading: editLoading,
      reset: editReset,
    },
  ] = useEditLessonMutation();

  const { data: coursesList, isLoading: courseLoading } = useGetCoursesQuery();
  const { data: lessonsList, isLoading: lessonLoading } = useGetLessonsQuery();
  const { data: imageList, isLoading: imgLoading } =
    useGetImagesQuery("lesson");

  const [theme, setTheme] = useState({ en: "", uk: "" });
  const [courseId, setCourseId] = useState("");
  const [themes, setThemes] = useState({ en: [], uk: [] });
  const [lesson, setLesson] = useState(() => ({
    en: {
      title: "",
      fields: [],
    },
    uk: {
      title: "",
      fields: [],
    },
  }));

  const [lessonImg, setLessonImg] = useState([]);

  useEffect(() => {
    if (lessonId && !imgLoading) {
      let imgFieldsClone = imageList.data.filter(
        (field) => field.parentId === lessonId
      );

      imgFieldsClone = imgFieldsClone.map((field) => ({
        ...field,
        editable: true,
      }));

      setLessonImg([...imgFieldsClone]);
    }
  }, [lessonId, imgLoading, imageList]);

  useEffect(() => {
    if (createSuccess) {
      Promise.all(
        lessonImg.map(async (field, index) => {
          const formData = new FormData();

          formData.append("index", field.index);
          formData.append("idx", field.idx);
          formData.append("file", field.file);
          formData.append("component", "lesson");
          formData.append("parentId", data.data._id);

          await createImage(formData);
        })
      );

      clean();
      reset();
    }
    if (editSuccess) {
      Promise.all(
        lessonImg.map(async (field, index) => {
          const formData = new FormData();

          formData.append("index", field.index);
          formData.append("idx", field.idx);
          formData.append("file", field.file);
          formData.append("component", "lesson");
          formData.append("parentId", lessonId);

          if (field.editable) {
            formData.append("_id", field._id);
            await editImage(formData);
          } else {
            await createImage(formData);
          }
        })
      );

      clean();
      editReset();
    }
  }, [
    createSuccess,
    editImgData,
    createImage,
    editImage,
    lessonImg,
    lessonId,
    data,
    reset,
    editSuccess,
    editReset,
  ]);

  useEffect(() => {
    if (lessonId && !lessonLoading && !courseLoading) {
      const obj = lessonsList?.data.find((a) => a._id === lessonId);

      const currentLesson = _.cloneDeep(obj);

      if (currentLesson.courseId) {
        setCourseId(currentLesson.courseId);
        let course = coursesList?.data?.find(
          (c) => c._id === currentLesson.courseId
        );
        setThemes({
          en: [...(course?.en?.themes || [])],
          uk: [...(course?.uk?.themes || [])],
        });
      }

      if (currentLesson.courseId) {
        setTheme({ en: currentLesson.en?.theme, uk: currentLesson.uk?.theme });
      }

      setLesson({ ...currentLesson });
    }

    return () => {
      setLesson({
        image: "",
        date: "",
        tags: [],
        en: {
          title: "",
          description: "",
          fields: [],
        },
        uk: {
          title: "",
          description: "",
          fields: [],
        },
      });
    };
  }, [lessonId, lessonLoading, lessonsList, courseLoading]);

  const onChangeInput = (...argument) => {
    const arg = argument[0];
    const lessonClone = { ...lesson };
    let lessonImgClone = [...lessonImg];

    const value = arg?.event?.target?.value;

    if (arg.element === "menu") {
      if (arg.content === "title") {
        lessonClone[arg.lng].fields[arg.index].content.title = value;
      }
      if (arg.content === "menu-item") {
        lessonClone[arg.lng].fields[arg.index].content.menu[arg.idx] = value;
      }
    }
    if (arg.element === "code") {
      lessonClone["en"].fields[arg.index].content = value;
      lessonClone["uk"].fields[arg.index].content = value;
    }
    if (arg.element === "code-language") {
      lessonClone["en"].fields[arg.index].language = value;
      lessonClone["uk"].fields[arg.index].language = value;
    }
    if (arg.element === "code-title") {
      lessonClone[arg.lng].fields[arg.index].title = value;
    }
    if (arg.element === "code-text") {
      lessonClone[arg.lng].fields[arg.index].text = value;
    }
    if (arg.element === "text") {
      lessonClone[arg.lng].fields[arg.index].content = value;
    }
    if (arg.element === "text-title") {
      lessonClone[arg.lng].fields[arg.index].title = value;
    }
    if (arg.element === "images") {
      if (arg.content === "image") {
        setImgError(() => {});
        if (arg.event.target?.files[0]?.size <= 3145728) {
          lessonClone["en"].fields[arg.index].content[arg.idx].img =
            arg.event.target?.files[0]?.name;
          lessonClone["uk"].fields[arg.index].content[arg.idx].img =
            arg.event.target?.files[0]?.name;

          if (
            lessonImgClone.find(
              (i) => i.idx === arg.idx && i.index === arg.index
            )
          ) {
            lessonImgClone = lessonImgClone.map((i) => {
              if (i.idx === arg.idx && i.index === arg.index) {
                return {
                  ...i,
                  file: arg.event.target?.files[0],
                };
              }
              return i;
            });
          } else {
            lessonImgClone.push({
              file: arg.event.target?.files[0],
              index: arg.index,
              idx: arg.idx,
            });
          }
        } else {
          setImgError(() => ({
            index: arg.index,
            idx: arg.idx,
            message: "Img must be less than 3 mb!",
          }));
          setTimeout(() => {
            setImgError({});
          }, 5000);
        }
      }
      if (arg.content === "description") {
        lessonClone[arg.lng].fields[arg.index].content[arg.idx].description =
          value;
      }
    }
    if (arg.element === "quote") {
      if (arg.content === "title") {
        lessonClone[arg.lng].fields[arg.index].content.title = value;
      }
      if (arg.content === "description") {
        lessonClone[arg.lng].fields[arg.index].content.description = value;
      }
    }
    if (arg.element === "title") {
      lessonClone[arg.lng].title = value;
    }
    if (arg.element === "select") {
      setCourseId(value);

      if (value) {
        let course = coursesList?.data?.find((c) => c._id === value);
        setTheme("");
        setThemes({ en: [...course.en.themes], uk: [...course.uk.themes] });
      } else {
        setThemes({ en: [], uk: [] });
      }
    }

    setLesson({ ...lessonClone });
    setLessonImg([...lessonImgClone]);
  };

  const renderFields = (lng) => {
    return lesson[lng].fields.map((item, index) => {
      if (item.element === "menu") {
        return (
          <div className="menu__group" key={index}>
            <div className="group__header">
              <h4>Menu box</h4>
              <Button onClick={() => removeField("menu", index)}>
                Delete field
              </Button>
              <Button onClick={() => addField("menu-item", index)}>
                Add item
              </Button>
            </div>
            <Input
              placeholder="Menu title"
              value={item.content.title}
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  content: "title",
                  element: "menu",
                  lng,
                })
              }
            />
            <ol className="menu__list">
              {item.content.menu.map((elem, idx) => (
                <li key={idx}>
                  <Input
                    placeholder={`Menu item ${idx + 1}`}
                    value={elem}
                    onChange={(event) =>
                      onChangeInput({
                        event,
                        index,
                        content: "menu-item",
                        element: "menu",
                        idx: idx,
                        lng,
                      })
                    }
                  />
                  <Button onClick={() => removeField("menu-item", index, idx)}>
                    <RiDeleteBinLine />
                  </Button>
                </li>
              ))}
            </ol>
          </div>
        );
      }
      if (item.element === "text") {
        return (
          <div className="text__group" key={index}>
            <div className="group__header">
              <h4>Text box</h4>
              <Button onClick={() => removeField("text", index)}>
                Delete field
              </Button>
            </div>
            <Input
              placeholder="Field title"
              value={item.title}
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  element: "text-title",
                  lng,
                })
              }
            />
            <TextArea
              value={item.content}
              placeholder="Field text"
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  element: "text",
                  lng,
                })
              }
              row={5}
            />
          </div>
        );
      }
      if (item.element === "code") {
        return (
          <div className="text__group" key={index}>
            <div className="group__header">
              <h4>Code box</h4>
              <Button onClick={() => removeField("code", index)}>
                Delete field
              </Button>
            </div>
            <Input
              placeholder="Code field title"
              value={item.title}
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  element: "code-title",
                  lng,
                })
              }
            />
            <TextArea
              value={item.text}
              placeholder="Code text"
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  element: "code-text",
                  lng,
                })
              }
              row={5}
            />
            <SelectOption
              value={item.language}
              arr={langs}
              disabled={!langs}
              title="Code language"
              lng={lng}
              onChange={(event) =>
                onChangeInput({
                  element: "code-language",
                  index,
                  event,
                  lng,
                })
              }
            />
            <TextArea
              value={item.content}
              placeholder="Field code"
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  element: "code",
                  lng,
                })
              }
              row={5}
            />
          </div>
        );
      }
      if (item.element === "images") {
        return (
          <div className="images__group" key={index}>
            <div className="group__header">
              <h4>Image box </h4>
              <Button onClick={() => removeField("images", index)}>
                Delete field
              </Button>
              <Button onClick={() => addField("image", index)}>
                Add image
              </Button>
            </div>
            {item.content.map((elem, idx) => (
              <div key={idx}>
                <div className="box_header">
                  <h5>Image {idx + 1}</h5>
                  <Button onClick={() => removeField("image", index, idx)}>
                    <RiDeleteBinLine />
                  </Button>
                  <span className="img__error">
                    {imgError?.message &&
                    imgError?.index === index &&
                    imgError?.idx === idx
                      ? imgError.message
                      : ""}
                  </span>
                </div>
                <div className="group__box">
                  <Upload
                    value={elem.img}
                    onChange={(event) =>
                      onChangeInput({
                        index,
                        event,
                        element: "images",
                        content: "image",
                        lng,
                        idx,
                      })
                    }
                  />
                  <Input
                    placeholder={`Image description ${index + 1}`}
                    value={elem.description}
                    onChange={(event) =>
                      onChangeInput({
                        event,
                        index,
                        element: "images",
                        content: "description",
                        idx,
                        lng,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        );
      }
      if (item.element === "quote") {
        return (
          <div className="quote__group" key={index}>
            <div className="group__header">
              <h4>Quote box</h4>
              <Button onClick={() => removeField("quote", index)}>
                Delete field
              </Button>
            </div>
            <Input
              placeholder={`Quote title`}
              value={item.content.title}
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  content: "title",
                  element: "quote",
                  lng,
                })
              }
            />
            <Input
              placeholder={`Quote description`}
              value={item.content.description}
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  content: "description",
                  element: "quote",
                  lng,
                })
              }
            />
          </div>
        );
      } else {
        return <p>Element not found</p>;
      }
    });
  };

  const addField = (field, idx) => {
    const textTemplate = {
      en: {
        element: "text",
        content: "",
        title: "",
      },
      uk: {
        element: "text",
        content: "",
        title: "",
      },
    };

    const codeTemplate = {
      en: {
        element: "code",
        content: "",
        language: "",
        title: "",
      },
      uk: {
        element: "code",
        content: "",
        language: "",
        title: "",
      },
    };

    const menuTemplate = {
      en: {
        element: "menu",
        content: {
          title: "",
          menu: [""],
        },
      },
      uk: {
        element: "menu",
        content: {
          title: "",
          menu: [""],
        },
      },
    };

    const imagesTemplate = {
      en: {
        element: "images",
        content: [{ img: "", description: "" }],
      },
      uk: {
        element: "images",
        content: [{ img: "", description: "" }],
      },
    };

    const quoteTemplate = {
      en: {
        element: "quote",
        content: {
          title: "",
          description: "",
        },
      },
      uk: {
        element: "quote",
        content: {
          title: "",
          description: "",
        },
      },
    };

    let lessonClone = { ...lesson };
    let enFields = [...lessonClone.en.fields];
    let ukFields = [...lessonClone.uk.fields];

    if (field === "text") {
      enFields.push({ ...textTemplate.en });
      ukFields.push({ ...textTemplate.uk });
    }
    if (field === "menu") {
      enFields.push({ ...menuTemplate.en });
      ukFields.push({ ...menuTemplate.uk });
    }
    if (field === "images") {
      enFields.push({ ...imagesTemplate.en });
      ukFields.push({ ...imagesTemplate.uk });
    }
    if (field === "quote") {
      enFields.push({ ...quoteTemplate.en });
      ukFields.push({ ...quoteTemplate.uk });
    }
    if (field === "code") {
      enFields.push({ ...codeTemplate.en });
      ukFields.push({ ...codeTemplate.uk });
    }
    if (field === "menu-item") {
      enFields = enFields.map((f, index) => {
        if (f.element === "menu" && index === idx) {
          return {
            ...f,
            content: { ...f.content, menu: [...f.content.menu, ""] },
          };
        }
        return f;
      });
      ukFields = ukFields.map((f, index) => {
        if (f.element === "menu" && index === idx) {
          return {
            ...f,
            content: { ...f.content, menu: [...f.content.menu, ""] },
          };
        }
        return f;
      });
    }
    if (field === "image") {
      enFields = enFields.map((f, index) => {
        if (f.element === "images" && index === idx) {
          return {
            ...f,
            content: [...f.content, { img: "", description: "" }],
          };
        }
        return f;
      });
      ukFields = ukFields.map((f, index) => {
        if (f.element === "images" && index === idx) {
          return {
            ...f,
            content: [...f.content, { img: "", description: "" }],
          };
        }
        return f;
      });
    }

    lessonClone.en.fields = [...enFields];
    lessonClone.uk.fields = [...ukFields];

    setLesson({ ...lessonClone });
  };

  const removeField = (field, idx, i) => {
    let lessonClone = { ...lesson };
    let enFields = [...lessonClone.en.fields];
    let ukFields = [...lessonClone.uk.fields];

    let articleImgFieldsClone = [...lessonImg];

    let filteredEnFields = [];
    let filteredUkFields = [];
    let filteredImgFields = [];

    if (
      field === "menu" ||
      field === "images" ||
      field === "quote" ||
      field === "text"
    ) {
      filteredEnFields = enFields.filter((f, index) => {
        return index !== idx;
      });

      filteredUkFields = ukFields.filter((f, index) => {
        return index !== idx;
      });

      filteredImgFields = articleImgFieldsClone.filter((f, index) => {
        return f.index !== idx;
      });
    } else if (field === "menu-item") {
      filteredEnFields = enFields.map((f, index) => {
        if (f.element === "menu" && index === idx) {
          let fieldContentMenu = f.content.menu.filter(
            (item, idxI) => idxI !== i
          );
          return {
            ...f,
            content: { ...f.content, menu: [...fieldContentMenu] },
          };
        } else {
          return f;
        }
      });
      filteredUkFields = ukFields.map((f, index) => {
        if (f.element === "menu" && index === idx) {
          let fieldContentMenu = f.content.menu.filter(
            (item, idxI) => idxI !== i
          );
          return {
            ...f,
            content: { ...f.content, menu: [...fieldContentMenu] },
          };
        } else {
          return f;
        }
      });
    } else if (field === "image") {
      filteredEnFields = enFields.map((f, index) => {
        if (f.element === "images" && index === idx) {
          let fieldContent = f.content.filter((item, idxI) => idxI !== i);
          return {
            ...f,
            content: [...fieldContent],
          };
        } else {
          return f;
        }
      });

      filteredUkFields = ukFields.map((f, index) => {
        if (f.element === "images" && index === idx) {
          let fieldContent = f.content.filter((item, idxI) => idxI !== i);
          return {
            ...f,
            content: [...fieldContent],
          };
        } else {
          return f;
        }
      });

      filteredImgFields = filteredImgFields.filter((f) => f.idx !== i);
    }

    lessonClone.en.fields = [...filteredEnFields];
    lessonClone.uk.fields = [...filteredUkFields];
    articleImgFieldsClone = [...filteredImgFields];

    setLesson({ ...lessonClone });
    setLessonImg([...articleImgFieldsClone]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const lessonData = {
      en: { ...lesson.en, theme: theme.en },
      uk: { ...lesson.uk, theme: theme.uk },
      courseId,
    };

    if (lessonId) {
      lessonData._id = lessonId;
      editLesson(lessonData);
    } else {
      createLesson(lessonData);
    }
  };

  const clean = () => {
    setLesson({
      en: {
        title: "",
        fields: [],
      },
      uk: {
        title: "",
        fields: [],
      },
    });
    setTheme({ en: "", uk: "" });
    setCourseId("");
    setThemes({ en: [], uk: [] });
    setLessonImg([]);
    navigate("/courses/lessons/form");
  };

  const onChangeTheme = (event, lng) => {
    let enTheme =
      event.target.selectedIndex === 0
        ? ""
        : themes.en[event.target.selectedIndex - 1];
    let ukTheme =
      event.target.selectedIndex === 0
        ? ""
        : themes.uk[event.target.selectedIndex - 1];
    setTheme({ en: enTheme, uk: ukTheme });
  };

  return (
    <div className="lesson__form">
      <h2>Lesson Form</h2>
      <div className="form__content">
        <div className="content__main">
          <div className="main__box">
            <h3>EN - forms</h3>
            <div className="input__group">
              <Input
                value={lesson.en.title}
                placeholder="Title"
                onChange={(event) =>
                  onChangeInput({
                    element: "title",
                    event,
                    lng: "en",
                  })
                }
              />
            </div>
            <div className="input__group">
              <SelectOption
                title="Select Course"
                value={courseId}
                arr={coursesList?.data}
                lng="en"
                disabled={courseLoading}
                isLoading={courseLoading}
                onChange={(event) =>
                  onChangeInput({ event, element: "select" })
                }
              />
            </div>
            <div className="input__group">
              <SelectOption
                title="Select Theme"
                value={theme.en}
                arr={themes.en}
                disabled={!themes.en.length}
                onChange={(event) => onChangeTheme(event, "en")}
              />
            </div>
            <div className="input__list">
              <h3>Lesson fields</h3>
              <div className="article__buttons">
                <Button onClick={() => addField("text")}>Add text</Button>
                <Button onClick={() => addField("menu")}>Add menu</Button>
                <Button onClick={() => addField("images")}>Add images</Button>
                <Button onClick={() => addField("quote")}>Add quote</Button>
                <Button onClick={() => addField("code")}>Add code</Button>
              </div>
              {renderFields("en")}
            </div>
          </div>
          <div className="main__box">
            <h3>UK - forms</h3>
            <div className="input__group">
              <Input
                value={lesson.uk.title}
                placeholder="Title"
                onChange={(event) =>
                  onChangeInput({
                    element: "title",
                    event,
                    lng: "uk",
                  })
                }
              />
            </div>
            <div className="input__group">
              <SelectOption
                selectedIndex={1}
                value={courseId}
                arr={coursesList?.data}
                lng="uk"
                disabled={courseLoading}
                isLoading={courseLoading}
                onChange={(event) =>
                  onChangeInput({ event, element: "select" })
                }
              />
            </div>
            <div className="input__group">
              <SelectOption
                value={theme.uk}
                arr={themes.uk}
                disabled={!themes.uk.length}
                onChange={(event) => onChangeTheme(event, "uk")}
              />
            </div>
            <div className="input__list">
              <h3>Lesson fields</h3>
              <div className="article__buttons">
                {helperTags.map((elem, index) => (
                  <div class="tooltip" key={index}>
                    <span className="tooltiptext" id={elem.label}>
                      Copy to clipboard
                    </span>
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigator.clipboard.writeText(elem.content);
                        var tooltip = document.getElementById(elem.label);
                        tooltip.innerText = "Copied: " + elem.content;
                      }}
                    >
                      {elem.label}
                    </Button>
                  </div>
                ))}
                <TextField
                  style={{ margin: 0, width: 120 }}
                  id="free-tooltip"
                  onChange={(e) => setFreeInput(e.target.value)}
                  value={freeInput}
                />

                <div class="tooltip">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(freeInput);
                      var tooltip = document.getElementById("myFreeTooltip");
                      tooltip.innerText = "Copied: " + freeInput;
                    }}
                  >
                    <span class="tooltiptext" id="myFreeTooltip">
                      Copy to clipboard
                    </span>
                    Copy text
                  </Button>
                </div>
              </div>
              {renderFields("uk")}
            </div>
          </div>
          <div className="box__submit">
            <Button onClick={onSubmitHandler} style={{ padding: "15px 45px" }}>
              {!lessonId ? "Create article" : "Edit article"}
            </Button>
            {createLoading || editLoading ? "...Loading" : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonForm;
