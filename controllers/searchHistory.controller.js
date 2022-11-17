const SearchHistoryItem = require("../models/searchhistory.model");
const _ = require("lodash");
const { query } = require("express");
const { assign } = require("lodash");

const searchHistoryController = {

    //Gets all items matching the search term(s).
    getSearchHistory: async function (req, res) {

        try {

            //Build empty query object
            let query = {}

            //If we have an email, do fuzzy searching using regex filter.
            if (req.query.email) {
                const regex = new RegExp(`.*${req.query.email}.*$`, "i")
                query.email = { '$regex': regex }
            }

            //If we have a searchTerm, do fuzzy searching using regex filter.
            if (req.query.searchTerm) {
                const regex = new RegExp(`.*${req.query.searchTerm}.*$`, "i")
                query.searchTerm = { '$regex': regex }
            }

            //Combine the query object with anything that we have in the request query.
            query = Object.assign({ ...req.query }, query)

            //Find items that match the query filters.
            const searchHistoryItems = await SearchHistoryItem.find(query)

            //Return the results.
            res.status(200).json(searchHistoryItems)

            //Err handler
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
    addSearchHistory: async function (req, res) {
        console.log("Req Body" + JSON.stringify(req.body))

        try {
            
            //Store body.
            const searchhistoryItem = req.body

            //Add the item from the body.
            const newSearchHistoryItem = await SearchHistoryItem.create(searchhistoryItem)

            //Find the newly created item and return it.
            res.status(201).json(await SearchHistoryItem.findById(newSearchHistoryItem._id))

        //Catch errors.
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
    updateSearchHistoryItem: async function (req, res) {

        //Check if the query object is empty, if it is we don't want to update everything.
        if (!_.isEmpty(req.query)) {

            try {

                //Build empty query object
                let query = {}

                //If we have an email, do fuzzy searching using regex filter.
                if (req.query.email) {
                    const regex = new RegExp(`.*${req.query.email}.*$`, "i")
                    query.email = { '$regex': regex }
                }

                //If we have a searchTerm, do fuzzy searching using regex filter.
                if (req.query.searchTerm) {
                    const regex = new RegExp(`.*${req.query.searchTerm}.*$`, "i")
                    query.searchTerm = { '$regex': regex }
                }

                //Combine the query object with anything that we have in the request query.
                query = Object.assign({ ...req.query }, query)

                //Find an item based on the query and update it, only updates one.
                const updatedItem = await SearchHistoryItem.updateOne(query)
                if (updatedItem) {
                    res.status(201).json(updatedItem)

                //If an item was not found, add it.
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

            //If the query object is empty, let the user know we need something to search for.
        } else {
            console.log("Empty query parameter supplied...")
            res.status(400).json({
                message: `Empty query parameter supplied, please provide at least one of the following: ${Object.keys(SearchHistoryItem.schema.tree)}.`,
                statusCode: res.statusCode
            })
        }
    },
    //Deletes a search history item.
    deleteSearchHistoryItem: async function (req, res) {
        if (!_.isEmpty(req.query)) {
            try {
                res.status(201).json(await SearchHistoryItem.deleteMany(req.query))
            } catch (error) {
                //handle errors
                console.log("failed to delete search history item: " + error)
                res.status(400).json({
                    message: error.message,
                    statusCode: res.statusCode
                })
            }
        } else {
            console.log("Empty query parameter supplied...")
            res.status(400).json({
                message: `Empty query parameter supplied, please provide at least one of the following: ${Object.keys(SearchHistoryItem.schema.tree)}.`,
                statusCode: res.statusCode
            })
        }
    }
}

module.exports = searchHistoryController;