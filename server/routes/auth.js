// Express Router 
const express = require("express");
const router = express.Router();

// Auth Controllers 
const {signup, signin} = require("../controllers/auth.js");

/* Sign Up
localhost:5000/api/auth/signup */
router.post("/signup", signup);

/* Sign In 
localhost:5000/api/auth/sigin */
router.post("/signin", signin);

module.exports = router;