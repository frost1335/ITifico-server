const { default: mongoose } = require("mongoose");
const Article = require("../models/Article");
const ErrorResponse = require("../utils/errorResponse");

exports.getAll = async (re1, res, next) => {
  try {
    const articles = await Article.find();

    res.status(200).json({ success: true, data: articles });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Article is not exsist"));
    }

    const article = await Article.findById(id);

    res.status(200).json({ success: true, data: article });
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res, next) => {
  const article = req.body;
  const newArticle = new Article({ ...article });
  try {
    newArticle.save();

    res.status(201).json({ success: true, data: newArticle });
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const article = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Article is not exsist"));
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { ...article },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedArticle });
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("This Article is not exsist"));
    }

    await Article.findByIdAndRemove(id);

    res
      .status(200)
      .json({ success: true, message: "Article deleted successfully" });
  } catch (err) {
    next(err);
  }
};
