import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { LinkedinShareButton } from "react-share";

import "./LinkedinShare.scss";

const LinkedinShare = () => {
  return (
    <LinkedinShareButton url={"http://localhost:3000"}>
      <div className="icon__box">
        <FaLinkedinIn />
      </div>
    </LinkedinShareButton>
  );
};

export default LinkedinShare;
