const express = require('express');
const router = express.Router();
const userMediaController = require("../controllers/usermedia.controller");


//router.post("/addMedia", userMediaController.addMedia);
//router.get("/findMedia", userMediaController.getMedia)


//post route to create a user  
router.post("/createMedia", userMediaController.createMedia)

//get route to return all media for all users  
router.get("/getAllMedia",  userMediaController.getAllMedia)

//get route to return media for a specific user
router.get("/getMediaForUser/:email", userMediaController.getMediaForUser)

//put route to update media for a specific user/media type
router.post("/updateUserMedia/:email/:mediaName", userMediaController.updateUserMedia)

router.delete("/deleteUserMedia", userMediaController.deleteUserMedia)


module.exports = router;