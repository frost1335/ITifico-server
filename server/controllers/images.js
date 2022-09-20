const { default: mongoose } = require("mongoose");
const Images = require("../models/Images");
const ErrorResponse = require("../utils/errorResponse");

exports.getAll = async (req, res, next) => {
  try {
    const images = await Images.find();

    res.status(200).json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res, next) => {
  const image = req.body;
  const newImage = new Images({ ...image, file: req.file.filename });

  try {
    newImage.save();

    res.status(201).json({ success: true, data: newImage });
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const image = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Images is not exsist"));
    }

    await Images.deleteMany({ parentId: image.parentId });

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
