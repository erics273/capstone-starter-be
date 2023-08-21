const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const tasteDiveController = require("../controllers/tasteDive.controller")

router.get("/related", tasteDiveController.tasteDiveGetRelatedMedia)


module.exports = router;