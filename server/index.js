require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const errorHandler = require("./middlewares/error");
const mongoDB = require("./config/db");
const ErrorResponse = require("./utils/errorResponse");
const app = express();

mongoDB(process.env.MONGOURI);

const whitelist = [process.env.CLIENT_URL, process.env.ADMIN_URL];

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

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "1mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

app.use("/api/article", require("./routes/article.routes"));
app.use("/api/course", require("./routes/course.routes"));
app.use("/api/tag", require("./routes/tag.routes"));
app.use("/api/images", require("./routes/images.routes"));
app.use("/api/lesson", require("./routes/lesson.routes"));
app.use("/api/practise", require("./routes/practise.routes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Log Error: ${err}`);
});
