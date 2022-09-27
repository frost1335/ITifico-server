const { default: mongoose } = require("mongoose");
const deleteFile = require("../utils/deleteFile");
const Practise = require("../models/Practise");
const ErrorResponse = require("../utils/errorResponse");

exports.getAll = async (req, res, next) => {
  try {
    const practises = await Practise.find();

    res.status(200).json({ success: true, data: practises });
  } catch (err) {
    next(err);
  }
};

exports.getByLesson = async (req, res, next) => {
  const { id } = req.params;

  try {
    const practise = await Practise.findOne({ lessonId: id });

    res.status(200).json({ success: true, data: practise });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Practise is not exsist"));
    }

    const practise = await Practise.findById(id);

    res.status(200).json({ success: true, data: practise });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const practise = req.body;

  try {
    const newPractise = await Practise.create({ ...practise });

    res.status(201).json({ success: true, data: newPractise });
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const practise = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Practise is not exsist"));
    }

    const updatedPractise = await Practise.findByIdAndUpdate(
      id,
      { ...practise },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedPractise });
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Practise is not exsist"));
    }

    await Practise.findByIdAndRemove(id);

    res
      .status(200)
      .json({ success: true, message: "Practise deleted successfully" });
  } catch (err) {
    next(err);
  }
};
