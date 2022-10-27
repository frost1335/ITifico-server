import React from "react";
import { FaTwitter } from "react-icons/fa";
import { TwitterShareButton } from "react-share";

import "./TwitterShare.scss";

const TwitterShare = ({ title, id }) => {
  return (
    <TwitterShareButton
      url={process.env.REACT_APP_URL + "/blog/view/" + id}
      title={title}
      hashtags={["code", "programming", "it", "ua", "coding"]}
    >
      <div className="icon__box">
        <FaTwitter />
      </div>
    </TwitterShareButton>
  );
};

export default TwitterShare;
