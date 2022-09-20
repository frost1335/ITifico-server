import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useGetTagsQuery } from "../../services/tagApi";

import "./Select.scss";

const Select = ({ value, onChange, arr }) => {
  const { data: tagList } = useGetTagsQuery();

  return (
    <div className="form__select">
      <div className="input__group">
        <Autocomplete
          multiple
          limitTags={2}
          value={value}
          options={tagList?.data || []}
          getOptionLabel={(option) => option.name}
          onChange={onChange}
          renderInput={(params) => (
            <TextField {...params} label="Tags" className="selec__input" />
          )}
        />
      </div>
    </div>
  );
};

export default Select;
