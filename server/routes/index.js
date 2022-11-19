// Express Router 
const express = require("express");
const router = express.Router();

// Routes
const auth = require("./auth");
const user = require("./user.js");
const video = require("./video.js");
const comment = require("./comment.js");

/* Express Router Middleware
localhost:5000/api/auth/
localhost:5000/api/users/
localhost:5000/api/videos/
localhost:5000/api/comment 
*/
router.use("/auth", auth);
router.use("/users", user);
router.use("/videos", video);
router.use("/comments", comment);

module.exports = router;