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
import { useGetArticleQuery } from "../../../../services/articleApi";
import { useParams } from "react-router-dom";
import { formatter } from "../../../../utils";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";

const Content = () => {
  const { articleId } = useParams();
  const { data: article, isLoading } = useGetArticleQuery(articleId);
  const { lng } = useSelector((state) => state.lngDetect);

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
              } else {
                return <p>Loading</p>;
              }
            })}
          </div>
        </div>
        <div className="content__sidebar">
          <Sidebar />
        </div>
      </div>
    </Container>
  );
};

export default Content;
