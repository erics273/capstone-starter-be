const express = require('express');
const searchHistoryController = require('../controllers/searchHistory.controller');
const router = express.Router();
const userMediaController = require("../controllers/searchHistory.controller");

//steves update put or patch ?
router.post("/addSearchHistory", searchHistoryController.addSearchHistory);
router.get("/getSearchHistory", searchHistoryController.getSearchHistory);
router.put("/updateSearchHistoryItem", searchHistoryController.updateSearchHistoryItem);
router.delete("/deleteSearchHistoryItem", searchHistoryController.deleteSearchHistoryItem)


module.exports = router;