// Video Model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({

      userId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      imgUrl: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
        required: true,
      },
      views: {
        type: Number,
        default: 0,
      },
      tags: {
        type: [String],
        default: []
      },
      likes: {
        type: [String],
        default: []
      },
      dislikes: {
        type: [String],
        default: []
      },
      commentsClosed: {
        type: Boolean,
        default: false,
      }

},
{timestamps: true});

module.exports = mongoose.model("Video", VideoSchema);