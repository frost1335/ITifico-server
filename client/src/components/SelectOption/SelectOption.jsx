import React from "react";

import "./SelectOption.scss";

const SelectOption = ({ arr, isLoading, value, onChange, disabled }) => {
    console.log(arr);
  return (
    <div className="select__option">
      <select
        id="theme-list"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="option__list"
      >
        <option value={""} key={123}>
          Select course
        </option>
        {isLoading ? (
          <option>Loading...</option>
        ) : arr?.length ? (
          arr?.map((c, i) => (
            <option value={c._id} key={i + "course"}>
              {c?.en?.title || c}
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
