import React from "react";
import { Container } from "@mui/material";

import "./Content.scss";
import {
  ImageBlock,
  MenuBlock,
  QuoteBlock,
  TextBlock,
} from "../../../../components";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import {
  useGetArticleQuery,
  useGetArticlesQuery,
} from "../../../../services/articleApi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { formatter } from "../../../../utils";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { useEffect } from "react";

import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import SocialButton from "../../../../components/SocialButton/SocialButton";
import LeftArrowIcon from "../../../../components/ArrowIcon/LeftArrowIcon";
import RightArrowIcon from "../../../../components/ArrowIcon/RightArrowIcon";
import CodeBlock from "../../../../components/CodeBlock/CodeBlock";

const Content = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { articleId } = useParams();
  const { data: article, isLoading } = useGetArticleQuery(articleId);
  const { data: articles, isLoading: articlesLoading } = useGetArticlesQuery();
  const { lng } = useSelector((state) => state.lngDetect);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  useEffect(() => {
    if (!articlesLoading) {
      articles?.data?.forEach((elem, index) => {
        if (elem._id === articleId) {
          setCurrentId(index);
        }
      });
    }
  }, [isLoading, articles, articleId, articlesLoading]);

  const onSlideArticle = (side) => {
    if (currentId >= 0 && articles?.data?.length - 1 >= currentId) {
      if (side === "left" && currentId > 0) {
        setCurrentId((prev) => prev - 1);
        navigate(`/articles/view/${articles?.data?.[currentId - 1]._id}`);
      }
      if (side === "right" && articles?.data?.length - 1 > currentId) {
        setCurrentId((prev) => prev + 1);
        navigate(`/articles/view/${articles?.data?.[currentId + 1]._id}`);
      }
    }
  };

  if (isLoading) return "Loading...";

  return (
    <Container maxWidth={"xl"}>
      <div className="article__content">
        <div className="content__main">
          <header className="content__header">
            <h1 className="header__title">{article?.data[lng].title}</h1>
            <div className="header__info">
              <h5>
                <span>
                  <MdOutlineDateRange />
                </span>
                {formatter(article?.data.date)}
              </h5>
              <h5>
                <span>
                  <IoMdEye />
                </span>
                {Math.floor(article?.data.views / 2)}
              </h5>
            </div>
          </header>
          <div className="content__body">
            {article?.data?.[lng].fields.map((field, index) => {
              if (field.element === "text") {
                return <TextBlock data={field} key={index + "field"} />;
              } else if (field.element === "menu") {
                return <MenuBlock data={field} key={index + "field"} />;
              } else if (field.element === "images") {
                return (
                  <ImageBlock
                    data={field}
                    index={index}
                    component="article"
                    key={index + "field"}
                  />
                );
              } else if (field.element === "quote") {
                return <QuoteBlock data={field} key={index + "field"} />;
              } else if (field.element === "code") {
                return <CodeBlock data={field} key={index + "field"} />;
              } else {
                return <p>Loading</p>;
              }
            })}
          </div>
          <footer className="content__footer">
            <div className="footer__social">
              <div className="social__left">
                <h6 className="left__text">Share:</h6>
                <div className="social__icons">
                  <Link to="#facebook" key="1" className="icon__box">
                    <FaFacebookF />
                  </Link>
                  <Link to="#twitter" key="2" className="icon__box">
                    <FaTwitter />
                  </Link>
                  <Link to="#linkedin" key="3" className="icon__box">
                    <FaLinkedinIn />
                  </Link>
                </div>
              </div>
              <div className="social__right">
                <Link to="#buycoffe" className="right__button">
                  <SocialButton />
                </Link>
              </div>
            </div>
            <div className="slide__article">
              <div className="slide__box">
                <button
                  onClick={() => onSlideArticle("left")}
                  className="prev__button"
                >
                  <LeftArrowIcon
                    disabled={
                      !articles?.data?.length || !currentId || currentId === 0
                    }
                  />
                </button>
                <p className="box__text">Prev article</p>
              </div>
              <div className="slide__box">
                <p className="box__text">Next article</p>
                <button
                  onClick={() => onSlideArticle("right")}
                  className="next__button"
                >
                  <RightArrowIcon
                    disabled={
                      !articles?.data?.length ||
                      articles?.data?.length === currentId + 1
                    }
                  />
                </button>
              </div>
            </div>
            <div className="footer__articles"></div>
          </footer>
        </div>
        <div className="content__sidebar">
          <Sidebar />
        </div>
      </div>
    </Container>
  );
};

export default Content;
