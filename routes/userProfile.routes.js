const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our userProfile routes
const userProfileController = require("../controllers/userProfile.controller")

//get route to return all users (requires auth)
router.get("/", validateJwtMiddleware, userProfileController.getUsers)

//get route to return a specific users (requires auth)
router.get("/:email", validateJwtMiddleware, userProfileController.getUser)

module.exports = router;