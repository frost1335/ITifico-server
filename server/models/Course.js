const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  background: String,
  themes: Array,
  icon: {
    type: String,
    default: "Icon does not exsists",
    required: true,
  },
  en: {
    title: String,
    description: String,
  },
  uk: {
    title: String,
    description: String,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
