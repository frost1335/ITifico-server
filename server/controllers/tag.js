const { default: mongoose } = require("mongoose");
const Tag = require("../models/Tag");
const ErrorResponse = require("../utils/errorResponse");

exports.getAll = async (re1, res, next) => {
  try {
    const tags = await Tag.find();

    res.status(200).json({ success: true, data: tags });
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res, next) => {
  const tag = req.body;
  const newTag = new Tag({ ...tag });
  try {
    newTag.save();

    res.status(201).json({ success: true, data: newTag });
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const tag = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Tag is not exsist"));
    }

    const updatedTag = await Tag.findByIdAndUpdate(
      id,
      { ...tag },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedTag });
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Tag is not exsist"));
    }

    await Tag.findByIdAndRemove(id);

    res
      .status(200)
      .json({ success: true, message: "Tag deleted successfully" });
  } catch (err) {
    next(err);
  }
};
