import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useEditTagMutation,
  useGetTagsQuery,
} from "../../services/tagApi";

import "./TagControl.scss";

const TagControl = () => {
  const [editTag] = useEditTagMutation();
  const [deleteTag] = useDeleteTagMutation();
  const [createTag] = useCreateTagMutation();
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  const [currentId, setCurrentId] = useState("");
  const { data: tagList, isLoading } = useGetTagsQuery();

  useEffect(() => {
    if (currentId && !isLoading) {
      const currentTag = tagList?.data?.find((t) => t._id === currentId);

      setName(currentTag.name);
      setBackground(currentTag.background);
    }
  }, [currentId, isLoading, tagList]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      background,
    };

    if (currentId) {
      data._id = currentId;
      editTag(data);
    } else {
      createTag(data);
    }

    clean();
  };

  const onDeleteHandler = (id) => {
    deleteTag({ id });
    clean();
  };

  const clean = () => {
    setCurrentId("");
    setName("");
    setBackground("");
  };

  return (
    <div className="tag__control">
      <Container maxWidth={"xl"}>
        <h3>Tag Control</h3>
        <Box sx={{ width: "100%" }} paddingTop={4}>
          <div className="tag__content">
            <form className="tag__form" onSubmit={onSubmitHandler}>
              <TextField
                label="Name"
                variant="standard"
                id="tag-name"
                value={name}
                name="tag-name"
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                label="Background"
                variant="standard"
                id="tag-bg"
                name="tag-bg"
                value={background}
                onChange={(event) => setBackground(event.target.value)}
              />
              <Button type="submit" variant="contained">
                {currentId ? "Edit tag" : "Create tag"}
              </Button>
            </form>
            <div className="tag__list">
              <ul className="list__menu">
                {isLoading
                  ? "Loading..."
                  : tagList?.data.map((tag, index) => (
                      <ol className="menu__item" key={index + "tag"}>
                        {index + 1}.
                        <Typography component={"h6"} variant={"h6"}>
                          {tag.name}
                        </Typography>
                        <span
                          className="bg__box"
                          style={{ background: tag.background }}
                        />
                        <div className="tag__buttons">
                          <Button onClick={() => setCurrentId(tag._id)}>
                            <RiEditLine />
                          </Button>
                          <Button onClick={() => onDeleteHandler(tag._id)}>
                            <RiDeleteBinLine />
                          </Button>
                        </div>
                      </ol>
                    ))}
              </ul>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default TagControl;
