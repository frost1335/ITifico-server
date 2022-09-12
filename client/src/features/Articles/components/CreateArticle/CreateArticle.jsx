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

  const [article, setArticle] = useState({
    en: {
      title: "",
      description: "",
      date: "",
      tags: [],
      fields: [],
    },
    uk: {
      title: "",
      description: "",
      date: "",
      tags: [],
      fields: [],
    },
  });

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
        articleClone[arg.lng].fields[arg.index].content.desctiption = value;
      }
    }
    if (arg.element === "title") {
      articleClone[arg.lng].title = value;
    }
    if (arg.element === "description") {
      articleClone[arg.lng].description = value;
    }
    if (arg.element === "date") {
      articleClone["en"].date = new Date(value);
      articleClone["uk"].date = new Date(value);
    }
    if (arg.element === "tags") {
      articleClone["en"].tags = arg.value;
      articleClone["uk"].tags = arg.value;
    }

    setArticle({ ...articleClone });
  };

  const renderFields = (lng) => {
    return article[lng].fields.map((item, index) => {
      if (item.element === "menu") {
        return (
          <div className="menu__group" key={index}>
            <h4>Menu box</h4>
            <TextField
              label={`Field menu `}
              variant="standard"
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
                    variant="standard"
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
                </li>
              ))}
            </ol>
          </div>
        );
      }
      if (item.element === "text") {
        return (
          <div className="text__group" key={index}>
            <h4>Text box</h4>
            <TextField
              label={`Field text`}
              value={item.content}
              variant="standard"
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
            <h4>Image box </h4>
            {item.content.map((elem, idx) => (
              <div key={idx}>
                <h4>Image 1</h4>
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
                  <TextField value={elem.img.name} variant="standard" />
                  <TextField
                    label={`Image description ${index + 1}`}
                    value={elem.description}
                    variant="standard"
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
            <h4>Quote box</h4>
            <TextField
              label={`Quote title`}
              value={item.content.title}
              variant="standard"
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
              value={item.content.desctiption}
              variant="standard"
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

  const addField = (field) => {
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
          desctiption: "",
        },
      },
      uk: {
        element: "quote",
        content: {
          title: "",
          desctiption: "",
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

    articleClone.en.fields = [...enFields];
    articleClone.uk.fields = [...ukFields];

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
      en: {
        title: "",
        description: "",
        date: "",
        tags: [],
        fields: [],
      },
      uk: {
        title: "",
        description: "",
        date: "",
        tags: [],
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
                  variant="standard"
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
                  variant="standard"
                  onChange={(event) =>
                    onChangeInput({
                      element: "description",
                      event,
                      lng: "en",
                    })
                  }
                />
              </div>
              <div className="input__group" key={"3"}>
                <TextField
                  label="Date"
                  type="date"
                  variant="standard"
                  value={moment(new Date(article.uk.date)).format("yyyy-MM-DD")}
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
                  value={article.en.tags}
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
                    <TextField {...params} label="Tags" variant="standard" />
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
                  variant="standard"
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
                  variant="standard"
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
              <div className="input__group" key={"3"}>
                <TextField
                  label="Date"
                  type="date"
                  value={moment(new Date(article.uk.date)).format("yyyy-MM-DD")}
                  variant="standard"
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
                  options={tagList?.data || []}
                  value={article.uk.tags}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) =>
                    onChangeInput({
                      element: "tags",
                      event,
                      value,
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" variant="standard" />
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
