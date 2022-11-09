const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our job request routes
const jobRequestController = require("../controllers/jobRequest.controller")
const appointmentController = require("../controllers/appointment.controller")

//post route to create a job request
router.post("/", jobRequestController.createJobRequest)

//get route to return all job requests (requires auth)
// keeping "validateJwtMiddlewear" means this route requires authentication
router.get("/", jobRequestController.getJobRequests)

// this is get route to retuan all job requests by user email
router.get("/:email", jobRequestController.getJobRequestsByEmail)

//get route to return a specific users (requires auth)
// router.get("/:email", validateJwtMiddleware, userController.getUser)

//put route to update an appointment (requires auth)
router.put("/:id", appointmentController.updateAppointment)

module.exports = router;
