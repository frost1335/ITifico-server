import React, { useState } from "react";
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
import { useCreateArticleMutation } from "../../../../services/articleApi";

const style = {
  width: "100%",
  bgcolor: "background.paper",
  p: 4,
};

const CreateArticle = () => {
  const [createArticle] = useCreateArticleMutation();
  const [currentId, setCurrentId] = useState("");

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
    if (currentId) {
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
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
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
                  options={top100Films}
                  value={article.uk.tags}
                  getOptionLabel={(option) => option.title}
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
                {currentId ? "Create article" : "Edit article"}
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CreateArticle;

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
