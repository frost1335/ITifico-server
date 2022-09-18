const fs = require("fs");
const path = require("path");
const ErrorResponse = require("./errorResponse");

module.exports = (photo) => {
  if (photo) {
    fs.unlink(path.join(__dirname, "../public/Uploads/" + photo), (err) => {
      if (err) {
        return new ErrorResponse("File not found", 404);
      }
    });
  }
};
