import React from "react";
import { Container } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Tag from "../../../../components/Tag/Tag";
import { useGetArticleQuery } from "../../../../services/articleApi";

import "./Card.scss";

const Card = () => {
  const { articleId } = useParams();
  const { data: article, isLoading } = useGetArticleQuery(articleId);

  if (isLoading) return "Loading...";

  console.log(article);

  return (
    <div className="article__card">
      <Container>
        <div className="card__box">
          <div className="article__card" key={new Date() + article}>
            <div className="article__header">
              <img src={article.data.en.image} alt="article-img" />
            </div>
            <div className="article__body">
              <div className="body__tags">
                {article.data?.en.tags.map((tag, i) => (
                  <Tag article tag={tag} key={"tag" + i} />
                ))}
              </div>
              <h4 className="article__title">
                <Link to={`#`}>{article.data?.en.title}</Link>
              </h4>
              <p className="article__text">
                {article.data?.en.description.length > 100
                  ? `${article.data?.en.description.substring(0, 100)}...`
                  : article.data?.en.description}
              </p>
            </div>
            <div className="article__footer">
              <h5 className="footer__date">
                <MdOutlineDateRange /> <span>{article.data?.en.date}</span>
              </h5>
              <h5 className="footer__views">
                <IoMdEye /> <span>{article.data?.en.views}</span>
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Card;
