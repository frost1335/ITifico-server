const { default: mongoose } = require("mongoose");
const deleteFile = require("../utils/deleteFile");
const Lesson = require("../models/Lesson");
const ErrorResponse = require("../utils/errorResponse");
const Images = require("../models/Images");

exports.getAll = async (req, res, next) => {
  try {
    const lessons = await Lesson.find();

    res.status(200).json({ success: true, data: lessons });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Lesson is not exsist"));
    }

    const lesson = await Lesson.findById(id);

    res.status(200).json({ success: true, data: lesson });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const lesson = req.body;

  try {
    const newLesson = await Lesson.create({ ...lesson });

    res.status(201).json({ success: true, data: newLesson });
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const lesson = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Lesson is not exsist"));
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { ...lesson },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedLesson });
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Lesson is not exsist"));
    }

    const images = await Images.find({ parentId: id }).select("file");
    images.forEach((elem) => deleteFile(elem.file));
    await Images.deleteMany({ parentId: id });

    await Lesson.findByIdAndRemove(id);

    res
      .status(200)
      .json({ success: true, message: "Lesson deleted successfully" });
  } catch (err) {
    next(err);
  }
};
