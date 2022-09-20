import { Typography } from "@mui/material";
import React from "react";
import { useGetArticlesQuery } from "../../../../services/articleApi";

import "./ArticleList.scss";
import { ArticleCard } from "../../../../components";

const ArticleList = ({ setCurrentId }) => {
  const { data: articlesList, isLoading } = useGetArticlesQuery();

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
              <ArticleCard article={article} key={index + "article"} />
            ))}
      </div>
    </div>
  );
};

export default ArticleList;
