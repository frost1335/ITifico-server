const mongoose = require("mongoose");

const imagesSchema = mongoose.Schema({
  component: {
    type: String,
    required: true
  },
  fields: {
    type: Array,
    requried: true
  }
});

const Images = mongoose.model("Image", imagesSchema);

module.exports = Images;
