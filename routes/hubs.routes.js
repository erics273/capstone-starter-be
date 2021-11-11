const express = require('express');
const router = express.Router();


//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the hubs controller to handle our hubs routes
const hubsController = require("../controllers/hubs.controller")

//post route to create a hub (hub registration)
router.post("/", hubsController.createHub)

//get route to return all hubs **no validator yet, not sure if needed 
router.get("/", hubsController.getHubs)

//put route to update a hub **no validator yet, not sure if needed 
// router.put("/:id", validateJwtMiddleware,hubsController.updateHub)
router.put("/:id", hubsController.updateHub)

//delete route to delete a hub **no validator yet, not sure if needed 
router.delete("/:id", validateJwtMiddleware, hubsController.deleteHub)


module.exports = router;