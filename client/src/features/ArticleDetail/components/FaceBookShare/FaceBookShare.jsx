import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FacebookShareButton } from "react-share";

import "./FaceBookShare.scss";

const FaceBookShare = ({ id }) => {
  return (
    <FacebookShareButton
      url={process.env.REACT_APP_URL + "/blog/view/" + id}
      quote={"ITifico"}
      hashtag={"programming"}
    >
      <div className="icon__box">
        <FaFacebookF />
      </div>
    </FacebookShareButton>
  );
};

export default FaceBookShare;
