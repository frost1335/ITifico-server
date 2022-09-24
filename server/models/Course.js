const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  background: String,
  icon: {
    type: String,
    default: "Icon does not exsists",
  },
  en: {
    title: String,
    themes: Array,
    description: String,
  },
  uk: {
    title: String,
    themes: Array,
    description: String,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
