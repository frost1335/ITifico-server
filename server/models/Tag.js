const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  name: {
    type: String,
  },
  background: {
    type: String,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
