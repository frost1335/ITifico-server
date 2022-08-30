const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  en: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    views: {
      type: Number,
      default: 0,
      required: true,
    },
    tags: {
      type: Array,
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
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    views: {
      type: Number,
      default: 0,
      required: true,
    },
    tags: {
      type: Array,
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
