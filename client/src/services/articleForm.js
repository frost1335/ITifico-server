import { createSlice } from "@reduxjs/toolkit";

let initialState = {
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
};

export const articleForm = createSlice({
  name: "article",
  initialState,
  reducers: {
    addField: (state, action) => {
      state.en.fields.push(action.payload);
      state.uk.fields.push(action.payload);
    },
    setForm: (state, action) => {
      state = { ...action.payload };
    },
    onChangeInput: (state, action) => {
      const arg = action.payload;
      const articleClone = state;
      const value = arg?.event;

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
    },
  },
});

export const articleActions = articleForm.actions;
export const articleReducer = articleForm.reducer;
