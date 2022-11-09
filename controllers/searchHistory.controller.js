const SearchHistoryItem = require("../models/searchhistory.model");

const searchHistoryController = {
    //Gets all items matching the search term, might want to incorporate fuzzy matching at some point.
    getSearchHistory: async function(req, res) {
        try {
            const searchHistoryItems = await SearchHistoryItem.find(req.query)
            res.status(200).json(searchHistoryItems)
        } catch (error) {
            //handle errors
            console.log("failed to get search history item(s): " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    },
    //Adds a search history item.
    addSearchHistory: async function(req, res) {
        try {
            const searchhistoryItem = req.body
            let newSearchHistoryItem = await SearchHistoryItem.create(searchhistoryItem)
            res.status(201).json(await SearchHistoryItem.findById(newSearchHistoryItem._id))
        } catch (error) {
            //handle errors
            console.log("failed to create search history item: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    },
    //Updates a search history item based on the term.
    updateSearchHistoryItem: async function(req, res) {
        try{
            const searchHistoryItem = req.body;
            let foundItem = await SearchHistoryItem.updateOne({searchTerm: req.body.searchTerm}, {resultCount: req.body.resultCount})
            if (foundItem) { 
                res.status(201).json(foundItem)
            } else {
                userMediaController.addSearchHistory(req, res)
            }
        } catch (error) {
            //handle errors
            console.log("failed to update search history item: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    },
    //Deletes a search history item.
    deleteSearchHistoryItem: async function (req, res) {
        try {
            console.log(req.body.searchTerm)
            res.status(201).json(await SearchHistoryItem.deleteMany({email: req.body.email, searchTerm: req.body.searchTerm}))
        } catch (error) {
            //handle errors
            console.log("failed to delete search history item: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    }
}

module.exports = searchHistoryController;