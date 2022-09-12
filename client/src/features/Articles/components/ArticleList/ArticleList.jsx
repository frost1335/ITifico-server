import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {
  useGetArticleQuery,
  useGetArticlesQuery,
} from "../../../../services/articleApi";

import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";

import "./ArticleList.scss";
import moment from "moment";

const ArticleList = () => {
  const { data: articlesList, isLoading } = useGetArticlesQuery();
  const { data: article } = useGetArticleQuery("631deb0a472f0adf58324c54");

  console.log(article);

  return (
    <div className="article__list">
      <Typography
        id="modal-modal-title"
        variant="h3"
        component="h2"
        marginBottom={4}
      >
        Articles list
      </Typography>
      <div className="list__menu">
        {isLoading
          ? "Loading..."
          : articlesList?.data?.map((article, index) => (
              <div className="menu__item" key={index + "article"}>
                <div className="item__img">
                  <img src="not_yet" alt="article-img" />
                </div>
                <div className="item__info">
                  <Typography variant="h5" component={"h4"}>
                    <Link to="/articles/view/id">{article.en.title}</Link>
                  </Typography>
                  <p className="info__desc">
                    {article.en.description.substring(0, 220)}
                  </p>
                  <p className="info__date">
                    {moment(article.en.date).format("DD.MM.YYYY")}
                  </p>
                  <div className="info__tags">
                    {article.en.tags.map((tag, idx) => (
                      <span className="tag" key={idx + "tag"}>
                        {tag.title}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="item__buttons">
                  <Button>
                    <RiEditLine />
                  </Button>
                  <Button>
                    <RiDeleteBinLine />
                  </Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ArticleList;
