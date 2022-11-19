// Profile Image Upload Middleware

/* Multer package is used for file and image upload operations. Allows uploading single and multiple files. 
This middleware is written for single image upload purposes. User can upload profile photo with this middleware. */

const multer = require("multer");
const path = require("path");

/* "storage" specifies where to load the file. It contains two properties named "destination" and "filename". These properties have "req, file, callback" parameters. */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      const rootDir = path.dirname(require.main.filename);
      cb(null, path.join(rootDir, "public/images"));
    }
    if (file.fieldname === "file") {
      const rootDir = path.dirname(require.main.filename);
      cb(null, path.join(rootDir, "public/videos"));
    }
  },

  filename: function (req, file, cb) {
    if (file.fieldname === "image") {
      const extension = file.mimetype.split("/")[1];
      req.savedImage = "image_" + Date.now() + "." + extension;
      cb(null, req.savedImage);
    }
    if (file.fieldname === "file") {
      const videoextension = file.mimetype.split("/")[1];
      req.savedVideo = "video_" + Date.now() + "." + videoextension;
      cb(null, req.savedVideo);
    }
  },
});

/* "fileFilter" specifies which types of files can be uploaded. */
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }

  if (file.fieldname === "file") {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
};

/* These are exported thanks to the "multer({})" method. */
const uploadFile = multer({ storage, fileFilter });

module.exports = uploadFile;
