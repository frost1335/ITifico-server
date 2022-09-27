import React from "react";

import "./SelectOption.scss";

const SelectOption = ({
  arr,
  isLoading,
  value,
  onChange,
  disabled,
  lng = "en",
  title,
}) => {
  return (
    <div className="select__option">
      <select
        id="theme-list"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="option__list"
      >
        <option value={"null"} key={0 + "course"}>
          {title}
        </option>
        {isLoading ? (
          <option>Loading...</option>
        ) : arr?.length ? (
          arr?.map((c, i) => (
            <option value={c?._id || c} key={i + 1 + "course"}>
              {c?.[lng]?.title ?? c}
            </option>
          ))
        ) : (
          <option>Courses not found</option>
        )}
      </select>
    </div>
  );
};

export default SelectOption;
