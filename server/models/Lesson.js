const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
  theme: String,
  views: {
    type: Number,
    default: 0,
    required: true,
  },
  en: {
    title: {
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
    fields: {
      type: Array,
    },
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
