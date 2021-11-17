const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the clinics controller to handle our clinic routes
const clinicsController = require("../controllers/clinics.controller")

//post route to create a clinic (clinic registration)
router.post("/", clinicsController.createClinic)

//get route to return all clinics **no validator yet, not sure if needed 
router.get("/", clinicsController.getClinics)

//put route to update a clinic **no validator yet, not sure if needed 
//Got auth working, but turning off for now
// router.put("/:id", validateJwtMiddleware, clinicsController.updateClinic)
router.put("/:id", clinicsController.updateClinic)

// router.get("/:id", validateJwtMiddleware, clinicsController.getClinic)
router.get("/:id", clinicsController.getClinic)

//delete route to delete a clinic **no validator yet, not sure if needed 
router.delete("/:id", validateJwtMiddleware, clinicsController.deleteClinic)


module.exports = router;