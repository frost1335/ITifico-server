import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { LinkedinShareButton } from "react-share";

import "./LinkedinShare.scss";

const LinkedinShare = ({ id }) => {
  return (
    <LinkedinShareButton url={process.env.REACT_APP_URL + "/blog/view/" + id}>
      <div className="icon__box">
        <FaLinkedinIn />
      </div>
    </LinkedinShareButton>
  );
};

export default LinkedinShare;
