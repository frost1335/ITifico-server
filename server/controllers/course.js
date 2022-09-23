const { default: mongoose } = require("mongoose");
const deleteFile = require("../utils/deleteFile");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");

exports.getAll = async (req, res, next) => {
  try {
    const courses = await Course.find();

    res.status(200).json({ success: true, data: courses });
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

exports.create = (req, res, next) => {
  const course = {
    icon: req.file?.filename,
    ...req.body,
    themes: JSON.parse(req.body.themes),
    en: JSON.parse(req.body.en),
    uk: JSON.parse(req.body.uk),
  };

  const newCourse = new Course({ ...course });

  try {
    newCourse.save();

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
    themes: JSON.parse(req.body.themes),
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
