// Express Router
const express = require("express");
const router = express.Router();

// JWT Auth Middleware
const {getAccessToRoute} = require("../middlewares/auth/auth.js");

// Upload Video with Multer
const uploadFile = require("../middlewares/multer/multerVideoConfig.js");

// Video Controllers
const {addVideo, updateVideo, deleteVideo, getVideo, getVideosByUser, addView, trend, random, smallRandom, sub, getByTag, search} = require("../controllers/video.js");

/* Get a Video
localhost:5000/api/videos/find/:id (http get method)
*/
router.get('/find/:id', getVideo);

/* Create a Video
localhost:5000/api/videos/ (http post method)
*/
router.post("/", [getAccessToRoute, uploadFile.fields([{name: 'image', maxCount:1}, {name: 'file',maxCount:1}])], addVideo);

/* Update a Video
localhost:5000/api/videos/:id (http put method)
*/
router.put('/:id', getAccessToRoute, updateVideo);

/* Delete a Video
localhost:5000/api/videos/:id (http delete method)
*/
router.delete('/:id', getAccessToRoute, deleteVideo);

/* Add View to a Video
localhost:5000/api/videos/view/:id (http put method)
*/
router.put('/view/:id', addView);

/* Get a Video by User
localhost:5000/api/videos/find/byuser/:id (http get method)
*/
router.get('/find/byuser/:id', getVideosByUser);

/* Get Random Videos
localhost:5000/api/videos/random (http get method)
*/
router.get('/random', random);

/* Get Random Videos for Recommended Videos in Front End
localhost:5000/api/videos/smallrandom (http get method)
*/
router.get('/smallrandom', smallRandom);

/* Get Trends Videos
localhost:5000/api/videos/trend (http get method)
*/
router.get('/trends', trend);

/* Get Sub Videos
localhost:5000/api/videos/sub (http get method)
*/
router.get('/sub', getAccessToRoute, sub);

/* Get Videos by Tags
localhost:5000/api/videos/tags?tags=js (http get method)
*/
router.get('/tags', getByTag);

/* Get Videos by Search Query
localhost:5000/api/videos/search?q=ben+enes
*/
router.get('/search', search);

module.exports = router;