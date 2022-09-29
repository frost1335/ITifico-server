import React from "react";
import { GoTriangleRight } from "react-icons/go";

import "./ArrowIcon.scss";

const RightArrowIcon = ({ disabled }) => {
  return (
    <div
      className={`arrow__icon arrow__icon--right  ${
        disabled && " arrow__icon--disabled"
      }`}
    >
      <GoTriangleRight />
    </div>
  );
};

export default RightArrowIcon;
