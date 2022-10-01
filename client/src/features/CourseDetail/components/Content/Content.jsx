import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ImageBlock,
  MenuBlock,
  QuoteBlock,
  TextBlock,
} from "../../../../components";
import LeftArrowIcon from "../../../../components/ArrowIcon/LeftArrowIcon";
import RightArrowIcon from "../../../../components/ArrowIcon/RightArrowIcon";
import Loader from "../../../../components/Loader/Loader";
import { useGetListQuery } from "../../../../services/courseApi";
import { useGetLessonQuery } from "../../../../services/lessonApi";
import Practise from "../../Practise/Practise";
import Sidebar from "../Sidebar/Sidebar";

import "./Content.scss";

const Content = () => {
  const { unitName, lessonId, courseId } = useParams();
  const navigate = useNavigate();

  const { data: lesson, isLoading: lessonLoading } =
    useGetLessonQuery(lessonId);
  const { data: units, isLoading: unitLoading } = useGetListQuery(courseId);
  const { lng } = useSelector((state) => state.lngDetect);
  const [number, setNumber] = useState({ index: 1, idx: 1 });
  const [allLessons, setAllLessons] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if ((!unitName || !lessonId) && !unitLoading) {
      navigate(
        `/courses/view/${courseId}/${
          units?.data?.[0]?.lessons?.[0]?._id
        }/${units?.data?.[0]?.["name-en"].trim().replace("#", "")}`
      );
    }
  }, [unitName, courseId, unitLoading, units, navigate, lessonId]);

  useEffect(() => {
    if (!unitLoading) {
      let arr = [];
      units?.data?.forEach((th) =>
        th.lessons.forEach((l) => arr.push({ ...l, theme: th["name-en"] }))
      );
      setAllLessons([...arr]);
      arr.forEach((l, i) => (l._id === lessonId ? setCurrentId(i) : l));
    }
  }, [unitLoading, units, lessonId]);

  if (lessonLoading || unitLoading || !unitName || !lessonId) return <Loader />;

  const onSlideLesson = (side) => {
    if (currentId >= 0 && allLessons.length - 1 >= currentId) {
      if (side === "left" && currentId > 0) {
        let cLess = allLessons?.[currentId - 1];
        setCurrentId((prev) => prev - 1);
        navigate(
          `/courses/view/${courseId}/${cLess._id}/${cLess.theme
            .trim()
            .replace("#", "")}`
        );
      }
      if (side === "right" && allLessons.length - 1 > currentId) {
        let cLess = allLessons?.[currentId + 1];
        setCurrentId((prev) => prev + 1);
        navigate(
          `/courses/view/${courseId}/${cLess._id}/${cLess.theme
            .trim()
            .replace("#", "")}`
        );
      }
    }
  };

  return (
    <React.Suspense fallback={<Loader />}>
      <div className="container">
        <div className="course__sidebarbg" />
        <div className="course__content">
          <div className="content__sidebar">
            <Sidebar setNumber={setNumber} />
          </div>
          <div className="content__main">
            <header className="content__header">
              <div className="header__title">
                <h3 className="title--small">{lesson?.data?.[lng]?.theme}</h3>
                <h1 className="title--main">{lesson?.data?.[lng]?.title}</h1>
              </div>
              <div className="header__rating">
                {number.index}.{number.idx}
              </div>
            </header>
            <div className="main__body">
              {lesson?.data?.[lng]?.fields.map((field, index) => {
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
            <div className="slide__lesson">
              <div className="slide__box">
                <button
                  onClick={() => onSlideLesson("left")}
                  className="prev__button"
                >
                  <LeftArrowIcon
                    disabled={
                      !currentId || currentId === 0 || !allLessons.length
                    }
                  />
                </button>
                <p className="box__text">Prev lesson </p>
              </div>
              <div className="slide__box">
                <p className="box__text">Next lesson</p>
                <button
                  onClick={() => onSlideLesson("right")}
                  className="next__button"
                >
                  <RightArrowIcon
                    disabled={
                      !allLessons.length || allLessons.length === currentId + 1
                    }
                  />
                </button>
              </div>
            </div>
            <div className="content__practise">
              <Practise />
            </div>
          </div>
        </div>
      </div>
    </React.Suspense>
  );
};

export default Content;
