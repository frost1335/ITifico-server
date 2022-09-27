const { default: mongoose } = require("mongoose");

const mongoDB = async (uri) => {
  await mongoose.connect(uri);

  console.log("MongoDB connected!");
};

module.exports = mongoDB;