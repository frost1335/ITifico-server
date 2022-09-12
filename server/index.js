require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");

const errorHandler = require("./middlewares/error");
const mongoDB = require("./config/db");
const ErrorResponse = require("./utils/errorResponse");
const app = express();

var whitelist = [process.env.CLIENT_URL, process.env.ADMIN_URL];

app.use(
  cors({
    origin: (origin, cb) => {
      if (whitelist.indexOf(origin) !== 1 || !origin) {
        cb(null, true);
      } else {
        cb(new ErrorResponse("Not allowed by CORS", 400));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoDB(process.env.MONGOURI);

app.use("/api/article", require("./routes/article.routes"));
app.use("/api/course", require("./routes/course.routes"));
app.use("/api/tag", require("./routes/tag.routes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
