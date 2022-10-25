import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FacebookShareButton } from "react-share";

import "./FaceBookShare.scss";

const FaceBookShare = () => {
  return (
    <FacebookShareButton url={"http://2350807.nf474563.web.hosting-test.net/"}>
      <div className="icon__box">
        <FaFacebookF />
      </div>
    </FacebookShareButton>
  );
};

export default FaceBookShare;
