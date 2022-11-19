const Video = require("../models/Video.js");
const Comment = require("../models/Comment.js");
const CustomError = require("../helpers/error/CustomError.js");

const addComment = async (req, res, next) => {
  const {desc} = req.body;
  try {
    const newComment = new Comment({ userId: req.user.id, ...req.body });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment has been deleted.");
    } else {
      return next(new CustomError("You can delete only your comment", 403));
    }
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addComment,
  deleteComment,
  getComments,
};
