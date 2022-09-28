import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, SelectOption, TextArea } from "../../../../components";
import { langs } from "../../../../constants";
import { RiDeleteBinLine } from "react-icons/ri";
import { useGetLessonsQuery } from "../../../../services/lessonApi";

import "./PractiseForm.scss";
import {
  useCreatePractiseMutation,
  useEditPractiseMutation,
  useGetPractisesQuery,
} from "../../../../services/practiseApi";
import { useEffect } from "react";
import _ from "lodash";

const PractiseForm = () => {
  const { search } = useLocation();
  const practiseId = search.replace("?practiseId=", "");
  const navigate = useNavigate();

  const { data: lessonsList, isLoading: lessonLoading } = useGetLessonsQuery();
  const { data: practiseList, isLoading: practiseLoading } =
    useGetPractisesQuery();
  const [createPractise] = useCreatePractiseMutation();
  const [editPractise] = useEditPractiseMutation();

  const [lessonId, setLessonId] = useState("");
  const [practise, setPractise] = useState({
    en: {
      fields: [],
    },
    uk: {
      fields: [],
    },
  });

  useEffect(() => {
    if (practiseId && !practiseLoading) {
      const currentPractise = practiseList?.data?.find(
        (p) => p._id === practiseId
      );

      let practise = _.cloneDeep(currentPractise);

      setPractise({ ...practise });
      setLessonId(currentPractise?.lessonId);
    }
  }, [practiseId, practiseList, practiseLoading]);

  const onChangeInput = (...argument) => {
    const arg = argument[0];
    const practiseClone = { ...practise };

    const value = arg?.event?.target?.value;

    if (arg.element === "question-desc") {
      practiseClone[arg.lng].fields[arg.index].question.description = value;
    }
    if (arg.element === "question-code") {
      practiseClone["en"].fields[arg.index].question.code = value;
      practiseClone["uk"].fields[arg.index].question.code = value;
    }
    if (arg.element === "question-lang") {
      practiseClone["en"].fields[arg.index].question.lang = value;
      practiseClone["uk"].fields[arg.index].question.lang = value;
    }
    if (arg.element === "answer-text") {
      practiseClone[arg.lng].fields[arg.index].answer.content = value;
    }
    if (arg.element === "answer-menu") {
      practiseClone[arg.lng].fields[arg.index].answer.content.title = value;
    }
    if (arg.element === "answer-item") {
      practiseClone[arg.lng].fields[arg.index].answer.content.items[arg.idx] =
        value;
    }

    setPractise({ ...practiseClone });
  };

  const onChangeElement = (index, element) => {
    const practiseClone = { ...practise };

    if (element === "text") {
      practiseClone.en.fields[index].answer = {
        element: "menu",
        content: {
          title: "",
          items: [""],
        },
      };
      practiseClone.uk.fields[index].answer = {
        element: "menu",
        content: {
          title: "",
          items: [""],
        },
      };
    } else {
      practiseClone.en.fields[index].answer = {
        element: "text",
        content: "",
      };
      practiseClone.uk.fields[index].answer = {
        element: "text",
        content: "",
      };
    }

    setPractise({ ...practiseClone });
  };

  const addMenuItem = (index) => {
    const practiseClone = { ...practise };

    practiseClone.en.fields[index].answer.content.items.push("");
    practiseClone.uk.fields[index].answer.content.items.push("");

    setPractise({ ...practiseClone });
  };

  const removeMenuItem = (index, idx) => {
    let practiseClone = { ...practise };

    let enItems = practiseClone.en.fields[index].answer.content.items.filter(
      (item, i) => i !== idx
    );
    let ukItems = practiseClone.uk.fields[index].answer.content.items.filter(
      (item, i) => i !== idx
    );

    practiseClone.en.fields[index].answer.content.items = enItems;
    practiseClone.uk.fields[index].answer.content.items = ukItems;
    setPractise({ ...practiseClone });
  };

  const removeField = (index) => {
    const practiseClone = { ...practise };

    let filteredFieldsEn = practiseClone.en.fields.filter(
      (field, idx) => index !== idx
    );
    let filteredFieldsUk = practiseClone.uk.fields.filter(
      (field, idx) => index !== idx
    );

    practiseClone.en.fields = filteredFieldsEn;
    practiseClone.uk.fields = filteredFieldsUk;
    setPractise({ ...practiseClone });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = { ...practise, lessonId };

    if (practiseId) {
      data._id = practiseId;
      editPractise(data);
    } else {
      createPractise(data);
    }

    clean();
  };

  const clean = () => {
    setPractise({
      en: {
        fields: [],
      },
      uk: {
        fields: [],
      },
    });
    setLessonId("");
    navigate("/courses/practise/form");
  };

  const renderFields = (lng) => {
    return practise[lng]?.fields?.map((field, index) => (
      <div className="input__field" key={index}>
        <div className="field__header">
          <Button onClick={() => removeField(index)}>Delete field</Button>
        </div>
        <div className="field__question">
          <h3>Question</h3>
          <TextArea
            value={field.question.description}
            placeholder="Question description"
            row={4}
            onChange={(event) =>
              onChangeInput({
                element: "question-desc",
                index,
                event,
                lng,
              })
            }
          />
          <TextArea
            value={field.question.code}
            placeholder="Question code"
            onChange={(event) =>
              onChangeInput({
                element: "question-code",
                index,
                event,
                lng,
              })
            }
          />
          <SelectOption
            value={field.question.lang}
            arr={langs}
            disabled={!langs}
            title="Code language"
            lng={lng}
            onChange={(event) =>
              onChangeInput({
                element: "question-lang",
                index,
                event,
                lng,
              })
            }
          />
        </div>
        <div className="field__answer">
          <div className="answer__header">
            <h3>Answer</h3>
            <Button
              onClick={() => onChangeElement(index, field.answer.element)}
            >
              {field.answer.element === "text" ? "Make menu" : "Make text"}
            </Button>
            {field.answer.element === "menu" && (
              <Button onClick={() => addMenuItem(index)}>Add item</Button>
            )}
          </div>
          {field.answer.element === "text" ? (
            <TextArea
              value={field.answer.content}
              placeholder="Question description"
              row={4}
              onChange={(event) =>
                onChangeInput({
                  element: "answer-text",
                  index,
                  event,
                  lng,
                })
              }
            />
          ) : (
            <div className="answer__menu">
              <Input
                value={field.answer.content.title}
                placeholder="Answer Menu"
                onChange={(event) =>
                  onChangeInput({
                    element: "answer-menu",
                    index,
                    event,
                    lng,
                  })
                }
              />
              <div className="menu__list">
                {field.answer.content.items.map((item, idx) => (
                  <li>
                    <Input
                      value={item}
                      placeholder={`Menu Item ${idx + 1}`}
                      onChange={(event) =>
                        onChangeInput({
                          element: "answer-item",
                          index,
                          event,
                          idx,
                          lng,
                        })
                      }
                    />
                    <Button onClick={() => removeMenuItem(index, idx)}>
                      <RiDeleteBinLine />
                    </Button>
                  </li>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    ));
  };

  const addField = () => {
    let practiseEnClone = [...practise.en.fields];
    let practiseUkClone = [...practise.uk.fields];
    let practiseClone = { ...practise };

    practiseEnClone.push({
      question: {
        description: "",
        lang: "",
        code: "",
      },
      answer: {
        element: "text",
        content: "",
      },
    });

    practiseUkClone.push({
      question: {
        description: "",
        lang: "",
        code: "",
      },
      answer: {
        element: "text",
        content: "",
      },
    });

    practiseClone.en.fields = [...practiseEnClone];
    practiseClone.uk.fields = [...practiseUkClone];

    setPractise({ ...practiseClone });
  };

  return (
    <div className="practise__form">
      <h2>Practise Form</h2>
      <div className="form__content">
        <div className="content__main">
          <div className="main__box">
            <h3>EN - forms</h3>
            <div className="input__group">
              <SelectOption
                title="Select Lesson"
                value={lessonId}
                arr={lessonsList?.data}
                lng="en"
                disabled={lessonLoading}
                isLoading={lessonLoading}
                onChange={(event) => setLessonId(event.target.value)}
              />
            </div>
            <div className="input__list">
              <h3>Practise fields</h3>
              <div className="article__buttons">
                <Button onClick={() => addField()}>Add field</Button>
              </div>
              {renderFields("en")}
            </div>
          </div>
          <div className="main__box">
            <h3>EN - forms</h3>
            <div className="input__group">
              <SelectOption
                title="Select Lesson"
                value={lessonId}
                arr={lessonsList?.data}
                lng="uk"
                disabled={lessonLoading}
                isLoading={lessonLoading}
                onChange={(event) => setLessonId(event.target.value)}
              />
            </div>
            <div className="input__list">
              <h3>Practise fields</h3>
              <div className="article__buttons">
                <Button onClick={() => addField()}>Add field</Button>
              </div>
              {renderFields("uk")}
            </div>
          </div>
          <div className="box__submit">
            <Button onClick={onSubmitHandler} style={{ padding: "15px 45px" }}>
              {!practiseId ? "Create article" : "Edit article"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PractiseForm;
