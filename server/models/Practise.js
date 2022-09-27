const mongoose = require("mongoose");

const practiseSchema = mongoose.Schema({
  lessonId: {
    type: String,
    unique: true,
    required: [true, "Please enter lesson ID"],
  },
  en: {
    fields: {
      type: Array,
    },
  },
  uk: {
    fields: {
      type: Array,
    },
  },
});

const Practise = mongoose.model("Practise", practiseSchema);

module.exports = Practise;
