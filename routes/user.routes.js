const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const userController = require("../controllers/user.controller")

//post route to create a user (user registration)
router.post("/", userController.createUser)

//get route to return all users (requires auth)
// temp comment out auth - router.get("/", validateJwtMiddleware, userController.getUsers)
router.get("/", userController.getUsers)

//get route to return all media for all users  
router.get("/getAllUsers",  userController.getUsers)

//get route to return counts by date for the creation of a user
router.get("/getAllUserCreationDateCounts",  userController.getAllUserCreationDateCounts)

//get route to return a specific users (requires auth)
router.get("/:email", validateJwtMiddleware, userController.getUser)

//put route to update a user (requires auth)
router.put("/:email", validateJwtMiddleware, userController.updateUser)

module.exports = router;
