const { default: mongoose } = require("mongoose");
const deleteFile = require("../utils/deleteFile");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const Lesson = require("../models/Lesson");

exports.getAll = async (req, res, next) => {
  try {
    const courses = await Course.find();

    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    next(err);
  }
};

exports.getList = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Course is not exsist"));
    }

    const lessons = await Lesson.find({ courseId: id }).select({
      en: { title: 1, theme: 1 },
      uk: { title: 1, theme: 1 },
    });
    const course = await Course.findById(id).select({
      en: { title: 1, themes: 1 },
      uk: { title: 1, themes: 1 },
    });

    const units = course.en.themes.map((theme, index) => {
      let themeLessons = lessons.filter((lesson) => lesson.en.theme === theme);
      themeLessons = themeLessons.map((lesson) => ({
        en: lesson.en.title,
        uk: lesson.uk.title,
        _id: lesson._id,
      }));

      return {
        ["name-en"]: course.en.themes[index],
        ["name-uk"]: course.uk.themes[index],
        lessons: themeLessons,
      };
    });

    res.status(200).json({ success: true, data: units });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Course is not exsist"));
    }

    const course = await Course.findById(id);

    res.status(200).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const course = {
    icon: req.file?.filename,
    ...req.body,
    en: JSON.parse(req.body.en),
    uk: JSON.parse(req.body.uk),
  };

  try {
    const newCourse = await Course.create({ ...course });

    res.status(201).json({ success: true, data: newCourse });
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const course = {
    icon: req.file ? req.file?.filename : req.body.file,
    ...req.body,
    en: JSON.parse(req.body.en),
    uk: JSON.parse(req.body.uk),
  };

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Course is not exsist"));
    }

    const oldCourse = await Course.findById(id).select("icon");

    if (oldCourse.icon && req.file) {
      deleteFile(oldCourse.icon);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { ...course },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedCourse });
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Course is not exsist"));
    }
    const article = await Course.findById(id).select("icon");

    if (article.icon) {
      deleteFile(article.icon);
    }

    await Course.findByIdAndRemove(id);

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    next(err);
  }
};
