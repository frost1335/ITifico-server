import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {
  useDeleteArticleMutation,
  useGetArticlesQuery,
} from "../../../../services/articleApi";

import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";

import "./ArticleList.scss";
import moment from "moment";
import Tag from "../../../../components/Tag/Tag";
import { ArticleCard } from "../../../../components";

const ArticleList = ({ setCurrentId }) => {
  const [deleteArticle] = useDeleteArticleMutation();

  const { data: articlesList, isLoading } = useGetArticlesQuery();

  const deleteHandler = (id) => {
    deleteArticle(id);
  };

  const onEditHandler = (id) => {
    setCurrentId(id);
  };

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
              <ArticleCard
                deleteHandler={deleteHandler}
                onEditHandler={onEditHandler}
                article={article}
                key={index + "article"}
              />
            ))}
      </div>
    </div>
  );
};

export default ArticleList;
