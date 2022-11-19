// Express Router 
const express = require("express");
const router = express.Router();

// JWT Auth Middleware
const {getAccessToRoute} = require("../middlewares/auth/auth.js")
// Profile Image
const multerUploadProfileImage = require("../middlewares/multer/multerImageConfig.js");

// User Controllers
const {getUser, updateUser, deleteUser, subscribeUser, unsubscribeUser, likeVideo, dislikeVideo, uploadProfileImage} = require("../controllers/user.js");

/* Find an User
localhost:5000/api/users/find/:id (http get method)
*/
router.get("/find/:id", getUser);

/* Update an User
localhost:5000/api/users/:id (http put method)
*/
router.put("/:id", getAccessToRoute, updateUser);

/* Delete an User
localhost:5000/api/users/:id (http delete method)
*/
router.delete("/:id", getAccessToRoute, deleteUser);

/* Subscribe an User
localhost:5000/api/users/sub/:id (http put method)
*/
router.put("/sub/:id", getAccessToRoute, subscribeUser);

/* Subscribe an User
localhost:5000/api/users/unsub/:id (http put method)
*/
router.put("/unsub/:id", getAccessToRoute, unsubscribeUser);

/* Like a Video
localhost:5000/api/users/like/:videoId (http put method)
*/
router.put("/like/:videoId", getAccessToRoute, likeVideo);

/* Dislike a Video
localhost:5000/api/users/dislike/:videoId (http put method)
*/
router.put("/dislike/:videoId", getAccessToRoute, dislikeVideo);

/* Upload Profile Image with Multer
localhost:5000/api/users/uploadProfileImage (http post method)
*/
router.post('/uploadProfileImage', [getAccessToRoute, multerUploadProfileImage.single("file")], uploadProfileImage);

module.exports = router;