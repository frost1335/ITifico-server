import React from "react";
import { GoTriangleLeft } from "react-icons/go";

import "./ArrowIcon.scss";

const LeftArrowIcon = ({ disabled }) => {
  return (
    <div
      className={`arrow__icon arrow__icon--left ${
        disabled && " arrow__icon--disabled"
      }`}
    >
      <GoTriangleLeft />
    </div>
  );
};

export default LeftArrowIcon;
