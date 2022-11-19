const User = require("../models/User.js");
const Video = require("../models/Video.js");
const CustomError = require("../helpers/error/CustomError.js");

const uploadProfileImage = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        img: `http://localhost:5000/images/${req.savedProfileImage}`,
        name: req.body.name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Image Upload Succesfull",
      data: user,
    });
  } catch (err) {
    return next(
      new CustomError("Failed to create photo, an error occurred.", 500)
    );
  }
};

const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(new CustomError("You can update only your account!", 403));
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(new CustomError("You can delete only your account", 403));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const subscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $addToSet: { subscribers: req.user.id },
    });
    res.status(200).json("Subscription successful.");
  } catch (err) {
    next(err);
  }
};

const unsubscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { subscribers: req.user.id },
    });
    res.status(200).json("Unsubscription successful.");
  } catch (err) {
    next(err);
  }
};

const likeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    /* Push metodu beğenilse bile tekrar beğeni koyar.
    $addToset sadece bir kere gerçekleştirir. */
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      /* Eğer beğenilirse dislikes arrayindan id'yi çıkarır. */
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

const dislikeVideo = async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      /* Push metodu beğenilse bile tekrar beğeni koyar.
      $addToset sadece bir kere gerçekleştirir. */
      $addToSet: { dislikes: id },
      /* Eğer beğenilirse dislikes arrayindan id'yi çıkarır. */
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  uploadProfileImage,
  updateUser,
  deleteUser,
  getUser,
  subscribeUser,
  unsubscribeUser,
  likeVideo,
  dislikeVideo,
};
