const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  image: {
    type: Object,
    required: true,
    default: "Img doesnt exsists",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tags: {
    type: Array,
  },
  views: {
    type: Number,
    default: 0,
    required: true,
  },
  en: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    fields: {
      type: Array,
    },
  },
  uk: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    fields: {
      type: Array,
    },
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
