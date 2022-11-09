const SearchHistoryItem = require("../models/searchhistory.model");

const searchHistoryController = {
    //Gets all items matching the search term, might want to incorporate fuzzy matching at some point.
    getSearchHistory: async function(req, res) {
        try {
            const searchHistoryTerm = req.body.searchTerm
            const searchHistoryItems = await SearchHistoryItem.find({searchTerm: searchHistoryTerm})
            res.status(201).json(searchHistoryItems)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    //Adds a search history item.
    addSearchHistory: async function(req, res) {
        try {
            const searchhistoryItem = req.body
            let newSearchHistoryItem = await SearchHistoryItem.create(searchhistoryItem)
            res.status(201).json(await SearchHistoryItem.findById(newSearchHistoryItem._id))
        } catch (error) {
            res.status(404).send(error)
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
            res.status(404).send(error)
        }
    },
    //Deletes a search history item.
    deleteSearchHistoryItem: async function (req, res) {
        try {
            console.log(req.body.searchTerm)
            res.status(201).json(await SearchHistoryItem.deleteMany({email: req.body.email, searchTerm: req.body.searchTerm}))
        } catch (error) {
            res.status(404).send(error)
        }
    }
}

module.exports = searchHistoryController;