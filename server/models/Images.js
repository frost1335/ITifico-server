const mongoose = require("mongoose");

const imagesSchema = mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  idx: {
    type: Number,
    required: true,
  },
  file: {
    type: Object,
    required: true,
  },
  component: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
  },
});

const Images = mongoose.model("Image", imagesSchema);

module.exports = Images;
