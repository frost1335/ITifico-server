const { default: mongoose } = require("mongoose");
const Images = require("../models/Images");
const deleteFile = require("../utils/deleteFile");
const ErrorResponse = require("../utils/errorResponse");

exports.getAll = async (req, res, next) => {
  try {
    const { component } = req.query;

    const images = await Images.find({ component });

    res.status(200).json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const image = req.body;

  try {
    const newImage = await Images.create({
      ...image,
      file: req.file?.filename,
    });

    res.status(201).json({ success: true, data: newImage });
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;

  const image = {
    ...req.body,
    file: req.file ? req.file?.filename : req.body.file,
  };

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Images is not exsist"));
    }

    const oldImage = await Images.findById(id).select("file");

    if (oldImage.file && req.file) {
      deleteFile(oldImage.file);
    }

    const updatedImages = await Images.findByIdAndUpdate(
      id,
      { ...image },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedImages });
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Images is not exsist"));
    }

    await Images.deleteMany();

    res
      .status(200)
      .json({ success: true, message: "Image deleted successfully" });
  } catch (err) {
    next(err);
  }
};
