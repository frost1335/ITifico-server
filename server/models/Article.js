const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  image: {
    type: Object,
    required: true,
    default: "Img doesnt exsists",
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
    required: true,
  },
  en: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  uk: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
