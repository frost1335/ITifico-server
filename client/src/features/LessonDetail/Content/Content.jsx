import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  ImageBlock,
  MenuBlock,
  TextBlock,
  QuoteBlock,
} from "../../../components";
import { useGetLessonQuery } from "../../../services/lessonApi";

import "./Content.scss";

const Content = () => {
  const { lessonId } = useParams();
  const { data: lesson, isLoading } = useGetLessonQuery(lessonId);
  const { lng } = useSelector((state) => state.lngDetect);

  if (isLoading) return "Loading...";

  console.log(lesson.data);

  return (
    <div className="container">
      <div className="lesson__content">
        <div className="content__main">
          <header className="content__header">
            <div className="header__title">
              <h3 className="title--small">{lesson?.data[lng]?.theme}</h3>
              <h1 className="title--main">{lesson?.data[lng]?.title}</h1>
            </div>
            <div className="header__rating">3.9</div>
          </header>
          <div className="main__body">
            {lesson?.data?.[lng].fields.map((field, index) => {
              if (field.element === "text") {
                return <TextBlock data={field} key={index + "field"} />;
              } else if (field.element === "menu") {
                return <MenuBlock data={field} key={index + "field"} />;
              } else if (field.element === "images") {
                return (
                  <ImageBlock
                    data={field}
                    index={index}
                    component="lesson"
                    key={index + "field"}
                  />
                );
              } else if (field.element === "quote") {
                return <QuoteBlock data={field} key={index + "field"} />;
              } else {
                return <p>Loading</p>;
              }
            })}
          </div>
          <div className="content__practise">
            Practise
            {/* <Practise /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
