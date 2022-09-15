import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  TextField,
  Autocomplete,
  Typography,
  Box,
  Button,
  Input,
} from "@mui/material";

import "./CreateArticle.scss";
import moment from "moment";
import {
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetArticlesQuery,
} from "../../../../services/articleApi";
import { useGetTagsQuery } from "../../../../services/tagApi";
import { RiDeleteBinLine } from "react-icons/ri";

const style = {
  width: "100%",
  bgcolor: "background.paper",
  p: 4,
};

const CreateArticle = ({ currentId: articleId, setCurrentId }) => {
  const { data: tagList } = useGetTagsQuery();
  const { data: articleList, isLoading } = useGetArticlesQuery();

  const [createArticle] = useCreateArticleMutation();
  const [editArticle] = useEditArticleMutation();

  const [article, setArticle] = useState(() => ({
    image: "",
    date: "",
    tags: [],
    en: {
      title: "",
      description: "",
      fields: [],
    },
    uk: {
      title: "",
      description: "",
      fields: [],
    },
  }));

  useEffect(() => {
    if (articleId && !isLoading) {
      const obj = articleList?.data.find((a) => a._id === articleId);

      const currentArticle = _.cloneDeep(obj);

      setArticle({ ...currentArticle });
    }
  }, [articleId, isLoading, articleList]);

  const onChangeInput = (...argument) => {
    const arg = argument[0];
    const articleClone = { ...article };
    const value = arg.event.target?.value;

    if (arg.element === "card-image") {
      articleClone.image = arg.event.target.files[0];
    }
    if (arg.element === "menu") {
      if (arg.content === "title") {
        articleClone[arg.lng].fields[arg.index].content.title = value;
      }
      if (arg.content === "menu-item") {
        articleClone[arg.lng].fields[arg.index].content.menu[arg.idx] = value;
      }
    }
    if (arg.element === "text") {
      articleClone[arg.lng].fields[arg.index].content = value;
    }
    if (arg.element === "images") {
      if (arg.content === "image") {
        console.log(arg);
        articleClone["en"].fields[arg.index].content[eval(arg.idx)].img =
          arg.event.target.files[0];
        articleClone["uk"].fields[arg.index].content[eval(arg.idx)].img =
          arg.event.target.files[0];
      }
      if (arg.content === "description") {
        articleClone[arg.lng].fields[arg.index].content[arg.idx].description =
          value;
      }
    }
    if (arg.element === "quote") {
      if (arg.content === "title") {
        articleClone[arg.lng].fields[arg.index].content.title = value;
      }
      if (arg.content === "description") {
        articleClone[arg.lng].fields[arg.index].content.description = value;
      }
    }
    if (arg.element === "title") {
      articleClone[arg.lng].title = value;
    }
    if (arg.element === "description") {
      articleClone[arg.lng].description = value;
    }
    if (arg.element === "date") {
      articleClone.date = new Date(value);
    }
    if (arg.element === "tags") {
      articleClone.tags = arg.value;
    }

    setArticle({ ...articleClone });
  };

  const renderFields = (lng) => {
    return article[lng].fields.map((item, index) => {
      if (item.element === "menu") {
        return (
          <div className="menu__group" key={index}>
            <div className="group__header">
              <h4>Menu box</h4>
              <Button onClick={() => removeField("menu", index)}>
                Delete field
              </Button>
              <Button
                variant="contained"
                onClick={() => addField("menu-item", index)}
              >
                Add item
              </Button>
            </div>
            <TextField
              label={`Field menu `}
              variant="outlined"
              value={item.content.title}
              name="menu-list"
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  content: "title",
                  element: "menu",
                  lng,
                })
              }
            />
            <ol className="menu__list">
              {item.content.menu.map((elem, idx) => (
                <li key={idx}>
                  <TextField
                    label={`Menu item ${idx + 1}`}
                    variant="outlined"
                    value={elem}
                    name="menu-text"
                    onChange={(event) =>
                      onChangeInput({
                        event,
                        index,
                        content: "menu-item",
                        element: "menu",
                        idx: idx,
                        lng,
                      })
                    }
                  />
                  <Button onClick={() => removeField("menu-item", index, idx)}>
                    <RiDeleteBinLine />
                  </Button>
                </li>
              ))}
            </ol>
          </div>
        );
      }
      if (item.element === "text") {
        return (
          <div className="text__group" key={index}>
            <div className="group__header">
              <h4>Text box</h4>
              <Button onClick={() => removeField("text", index)}>
                Delete field
              </Button>
            </div>
            <TextField
              label={`Field text`}
              value={item.content}
              variant="outlined"
              name="field-text"
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  element: "text",
                  lng,
                })
              }
            />
          </div>
        );
      }
      if (item.element === "images") {
        return (
          <div className="images__group" key={index}>
            <div className="group__header">
              <h4>Image box </h4>
              <Button onClick={() => removeField("images", index)}>
                Delete field
              </Button>
              <Button
                variant="contained"
                onClick={() => addField("image", index)}
              >
                Add image
              </Button>
            </div>
            {item.content.map((elem, idx) => (
              <div key={idx}>
                <div className="box_header">
                  <Typography variant="h6">Image {idx + 1}</Typography>
                  <Button onClick={() => removeField("image", index, idx)}>
                    <RiDeleteBinLine />
                  </Button>
                </div>
                <div className="group__box">
                  <label
                    htmlFor={`contained-button-file${idx}-${index}`}
                    className="form-input"
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Input
                      accept="image/*"
                      className={idx}
                      id={`contained-button-file${idx}-${index}`}
                      name="img"
                      type="file"
                      style={{ opacity: 0 }}
                      onChange={(event) =>
                        onChangeInput({
                          index,
                          event,
                          element: "images",
                          content: "image",
                          lng,
                          idx,
                        })
                      }
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      type="button"
                      size="large"
                    >
                      Image upload
                    </Button>
                  </label>
                  <TextField value={elem.img?.name} variant="outlined" />
                  <TextField
                    label={`Image description ${index + 1}`}
                    value={elem.description}
                    variant="outlined"
                    name="image-description"
                    onChange={(event) =>
                      onChangeInput({
                        event,
                        index,
                        element: "images",
                        content: "description",
                        idx,
                        lng,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        );
      }
      if (item.element === "quote") {
        return (
          <div className="quote__group" key={index}>
            <div className="group__header">
              <h4>Quote box</h4>
              <Button onClick={() => removeField("quote", index)}>
                Delete field
              </Button>
            </div>
            <TextField
              label={`Quote title`}
              value={item.content.title}
              variant="outlined"
              name="quote-title"
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  content: "title",
                  element: "quote",
                  lng,
                })
              }
            />
            <TextField
              label={`Quote description`}
              value={item.content.description}
              variant="outlined"
              name="quote-description"
              onChange={(event) =>
                onChangeInput({
                  event,
                  index,
                  content: "description",
                  element: "quote",
                  lng,
                })
              }
            />
          </div>
        );
      } else {
        return <p>Element not found</p>;
      }
    });
  };

  const addField = (field, idx) => {
    const textTemplate = {
      en: {
        element: "text",
        content: "",
      },
      uk: {
        element: "text",
        content: "",
      },
    };

    const menuTemplate = {
      en: {
        element: "menu",
        content: {
          title: "",
          menu: [""],
        },
      },
      uk: {
        element: "menu",
        content: {
          title: "",
          menu: [""],
        },
      },
    };

    const imagesTemplate = {
      en: {
        element: "images",
        content: [{ img: "", description: "" }],
      },
      uk: {
        element: "images",
        content: [{ img: "", description: "" }],
      },
    };

    const quoteTemplate = {
      en: {
        element: "quote",
        content: {
          title: "",
          description: "",
        },
      },
      uk: {
        element: "quote",
        content: {
          title: "",
          description: "",
        },
      },
    };

    let articleClone = { ...article };
    let enFields = [...articleClone.en.fields];
    let ukFields = [...articleClone.uk.fields];

    if (field === "text") {
      enFields.push({ ...textTemplate.en });
      ukFields.push({ ...textTemplate.uk });
    }
    if (field === "menu") {
      enFields.push({ ...menuTemplate.en });
      ukFields.push({ ...menuTemplate.uk });
    }
    if (field === "images") {
      enFields.push({ ...imagesTemplate.en });
      ukFields.push({ ...imagesTemplate.uk });
    }
    if (field === "quote") {
      enFields.push({ ...quoteTemplate.en });
      ukFields.push({ ...quoteTemplate.uk });
    }
    if (field === "menu-item") {
      enFields = enFields.map((f, index) => {
        if (f.element === "menu" && index === idx) {
          return {
            ...f,
            content: { ...f.content, menu: [...f.content.menu, ""] },
          };
        }
        return f;
      });
      ukFields = ukFields.map((f, index) => {
        if (f.element === "menu" && index === idx) {
          return {
            ...f,
            content: { ...f.content, menu: [...f.content.menu, ""] },
          };
        }
        return f;
      });
    }
    if (field === "image") {
      enFields = enFields.map((f, index) => {
        if (f.element === "images" && index === idx) {
          return {
            ...f,
            content: [...f.content, { img: "", description: "" }],
          };
        }
        return f;
      });
      ukFields = ukFields.map((f, index) => {
        if (f.element === "images" && index === idx) {
          return {
            ...f,
            content: [...f.content, { img: "", description: "" }],
          };
        }
        return f;
      });
    }

    articleClone.en.fields = [...enFields];
    articleClone.uk.fields = [...ukFields];

    setArticle({ ...articleClone });
  };

  const removeField = (field, idx, i) => {
    let articleClone = { ...article };
    let enFields = [...articleClone.en.fields];
    let ukFields = [...articleClone.uk.fields];
    let filteredEnFields = [];
    let filteredUkFields = [];

    if (
      field === "menu" ||
      field === "images" ||
      field === "quote" ||
      field === "text"
    ) {
      filteredEnFields = enFields.filter((f, index) => {
        console.log(index, idx, f);
        return index !== idx;
      });

      filteredUkFields = ukFields.filter((f, index) => {
        console.log(index, idx, f);
        return index !== idx;
      });
    } else if (field === "menu-item") {
      filteredEnFields = enFields.map((f, index) => {
        if (f.element === "menu" && index === idx) {
          let fieldContentMenu = f.content.menu.filter(
            (item, idxI) => idxI !== i
          );
          return {
            ...f,
            content: { ...f.content, menu: [...fieldContentMenu] },
          };
        } else {
          return f;
        }
      });
      filteredUkFields = ukFields.map((f, index) => {
        if (f.element === "menu" && index === idx) {
          let fieldContentMenu = f.content.menu.filter(
            (item, idxI) => idxI !== i
          );
          return {
            ...f,
            content: { ...f.content, menu: [...fieldContentMenu] },
          };
        } else {
          return f;
        }
      });
    } else if (field === "image") {
      filteredEnFields = enFields.map((f, index) => {
        if (f.element === "images" && index === idx) {
          let fieldContent = f.content.filter((item, idxI) => idxI !== i);
          return {
            ...f,
            content: [...fieldContent],
          };
        } else {
          return f;
        }
      });

      filteredUkFields = ukFields.map((f, index) => {
        if (f.element === "images" && index === idx) {
          let fieldContent = f.content.filter((item, idxI) => idxI !== i);
          return {
            ...f,
            content: [...fieldContent],
          };
        } else {
          return f;
        }
      });
    }
    console.log(enFields);
    console.log(ukFields);

    articleClone.en.fields = [...filteredEnFields];
    articleClone.uk.fields = [...filteredUkFields];

    setArticle({ ...articleClone });
  };

  const onSubmitHandler = () => {
    if (articleId) {
      editArticle({ ...article, _id: articleId });
    } else {
      createArticle(article);
    }

    clean();
  };

  const clean = () => {
    setArticle({
      image: "",
      date: "",
      tags: [],
      en: {
        title: "",
        description: "",
        fields: [],
      },
      uk: {
        title: "",
        description: "",
        fields: [],
      },
    });
    setCurrentId("");
  };

  return (
    <div className="articles__modal">
      <Box sx={style}>
        <div className="modal__content">
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Course form
          </Typography>
          <div className="modal__main">
            <div className="main__box">
              <h3>EN - forms</h3>
              <div className="input__group" key={"1"}>
                <TextField
                  label="Title"
                  variant="outlined"
                  value={article.en.title}
                  onChange={(event) =>
                    onChangeInput({
                      element: "title",
                      event,
                      lng: "en",
                    })
                  }
                />
              </div>
              <div className="input__group" key={"2"}>
                <TextField
                  label="Card description"
                  value={article.en.description}
                  variant="outlined"
                  onChange={(event) =>
                    onChangeInput({
                      element: "description",
                      event,
                      lng: "en",
                    })
                  }
                />
              </div>
              <div className="input__group" key={"234"}>
                <div className="group__box">
                  <label
                    htmlFor={`contained-button-file-card`}
                    className="form-input"
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Input
                      accept="image/*"
                      id={`contained-button-file-card`}
                      name="img"
                      type="file"
                      style={{ opacity: 0 }}
                      onChange={(event) =>
                        onChangeInput({
                          event,
                          element: "card-image",
                        })
                      }
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      type="button"
                      size="large"
                    >
                      Image upload
                    </Button>
                  </label>
                  <TextField value={article.image?.name} variant="outlined" />
                </div>
              </div>
              <div className="input__group" key={"3"}>
                <TextField
                  label="Date"
                  type="date"
                  variant="outlined"
                  value={moment(new Date(article.date)).format("yyyy-MM-DD")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) =>
                    onChangeInput({
                      element: "date",
                      event,
                    })
                  }
                />
              </div>
              <div className="input__group" key={"4"}>
                <Autocomplete
                  multiple
                  limitTags={2}
                  value={article.tags}
                  options={tagList?.data || []}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) =>
                    onChangeInput({
                      element: "tags",
                      event,
                      value,
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" variant="outlined" />
                  )}
                  sx={{ width: "500px" }}
                />
              </div>
              <div className="input__list">
                <h3>Article fields</h3>
                <div className="article__buttons">
                  <Button variant="contained" onClick={() => addField("text")}>
                    Add text
                  </Button>
                  <Button variant="contained" onClick={() => addField("menu")}>
                    Add menu
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => addField("images")}
                  >
                    Add images
                  </Button>
                  <Button variant="contained" onClick={() => addField("quote")}>
                    Add quote
                  </Button>
                </div>
                {renderFields("en")}
              </div>
            </div>
            <div className="main__box">
              <h3>UK - forms</h3>
              <div className="input__group" key={"1"}>
                <TextField
                  label="Title"
                  variant="outlined"
                  value={article.uk.title}
                  onChange={(event) =>
                    onChangeInput({
                      element: "title",
                      event,
                      lng: "uk",
                    })
                  }
                />
              </div>
              <div className="input__group" key={"2"}>
                <TextField
                  label="Card description"
                  variant="outlined"
                  onChange={(event) =>
                    onChangeInput({
                      element: "description",
                      event,
                      lng: "uk",
                    })
                  }
                  value={article.uk.description}
                />
              </div>
              <div className="input__group" key={"234"}>
                <div className="group__box">
                  <label
                    htmlFor={`contained-button-file-card`}
                    className="form-input"
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Input
                      accept="image/*"
                      id={`contained-button-file-card`}
                      name="img"
                      type="file"
                      style={{ opacity: 0 }}
                      onChange={(event) =>
                        onChangeInput({
                          event,
                          element: "card-image",
                        })
                      }
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      type="button"
                      size="large"
                    >
                      Image upload
                    </Button>
                  </label>
                  <TextField value={article.image?.name} variant="outlined" />
                </div>
              </div>
              <div className="input__group" key={"3"}>
                <TextField
                  label="Date"
                  type="date"
                  value={moment(new Date(article.date)).format("yyyy-MM-DD")}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) =>
                    onChangeInput({
                      element: "date",
                      event,
                    })
                  }
                />
              </div>
              <div className="input__group" key={"4"}>
                <Autocomplete
                  multiple
                  limitTags={2}
                  value={article.tags}
                  options={tagList?.data || []}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) =>
                    onChangeInput({
                      element: "tags",
                      event,
                      value,
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" variant="outlined" />
                  )}
                  sx={{ width: "500px" }}
                />
              </div>
              <div className="input__list">
                <h3>Article fields</h3>
                <div className="article__buttons">
                  <Typography variant="h6">Add dynamic input forms</Typography>{" "}
                </div>
                {renderFields("uk")}
              </div>
            </div>
            <div className="box__submit">
              <Button
                onClick={onSubmitHandler}
                style={{ padding: "15px 45px" }}
                variant="contained"
              >
                {!articleId ? "Create article" : "Edit article"}
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CreateArticle;
