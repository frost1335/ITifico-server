import React from "react";
import { FaTwitter } from "react-icons/fa";
import { TwitterShareButton } from "react-share";

import "./TwitterShare.scss";

const TwitterShare = () => {
  const currentUrl = window.location.href;
  return (
    <TwitterShareButton url={currentUrl}>
      <div className="icon__box">
        <FaTwitter />
      </div>
    </TwitterShareButton>
  );
};

export default TwitterShare;
