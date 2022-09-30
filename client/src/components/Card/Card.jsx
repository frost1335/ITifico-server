import React from "react";
import { IoMdEye } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Tag from "../Tag/Tag";

import "./Card.scss";
import { formatter } from "../../utils";
import { Button } from "@mui/material";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useDeleteArticleMutation } from "../../services/articleApi";
import { useRef } from "react";
import { useEffect } from "react";

const Card = ({ article }) => {
  const description = useRef(null);

  const [deleteArticle] = useDeleteArticleMutation();
  const navigate = useNavigate();
  const { lng } = useSelector((state) => state.lngDetect);

  useEffect(() => {
    description.current.innerHTML =
      article?.[lng]?.description?.length > 100
        ? `${article?.[lng]?.description.substring(0, 100)}...`
        : article?.[lng]?.description;
  }, [article, lng]);

  return (
    <div className="article__card">
      <div className="card__box">
        <div className="article__buttons">
          <Button
            onClick={() => navigate(`/articles/form?articleId=${article?._id}`)}
          >
            <RiEditLine />
          </Button>
          <Button onClick={() => deleteArticle(article?._id)}>
            <RiDeleteBinLine />
          </Button>
        </div>
        <div className="article__card" key={new Date() + article}>
          <div className="article__header">
            <img
              src={
                process.env.REACT_APP_BASE_URL + `/Uploads/${article?.image}`
              }
              alt="article-img"
            />
          </div>
          <div className="article__body">
            <div className="body__tags">
              {article?.tags.map((tag, i) => (
                <Tag article tag={tag} key={"tag" + i} />
              ))}
            </div>
            <h4 className="article__title">
              <Link to={`/articles/view/${article?._id}`}>
                {article?.[lng]?.title}
              </Link>
            </h4>
            <p className="article__text" ref={description}>
              {article?.[lng]?.description?.length > 100
                ? `${article?.[lng]?.description.substring(0, 100)}...`
                : article?.[lng]?.description}
            </p>
          </div>
          <div className="article__footer">
            <h5 className="footer__date">
              <MdOutlineDateRange /> <span>{formatter(article?.date)}</span>
            </h5>
            <h5 className="footer__views">
              <IoMdEye /> <span>{Math.floor(article?.views / 2)}</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
