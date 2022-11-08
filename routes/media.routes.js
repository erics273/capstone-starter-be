const express = require('express');
const router = express.Router();
const userMediaController = require("../controllers/usermedia.controller");


router.post("/addMedia", userMediaController.addMedia);
router.get("/findMedia", userMediaController.getMedia)
module.exports = router;