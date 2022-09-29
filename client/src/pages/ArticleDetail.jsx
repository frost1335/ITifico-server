import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../features/ArticleDetail/components/Content/Content";
import { useEditArticleViewMutation } from "../services/articleApi";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [editArticleView] = useEditArticleViewMutation();

  useEffect(() => {
    editArticleView({ viewed: true, _id: articleId });
  }, []);

  return (
    <>
      <Content />
    </>
  );
};

export default ArticleDetail;
