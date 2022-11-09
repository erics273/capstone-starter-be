const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },
    searchTerm: {
        type: String, 
        required: true,
    },
    searchDate: { 
        type: Date, 
        required: true, 
    },
    resultCount: {
        type: Number,
        required: true
    }
});

let searchHistoryItem = mongoose.model("searchHistoryItem", searchHistorySchema);

module.exports = searchHistoryItem;