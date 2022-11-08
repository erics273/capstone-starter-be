const mongoose = require("mongoose");

const userMediaSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        index: { 
            unique: true 
        },
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },
    mediaName: {
        type: String, 
        required: true,
    },
    mediaRating: { 
        type: Number, 
        required: true, 
        min: 1,
        max: 5,
    },
});

const UserMedia = mongoose.model('UserMedia', userMediaSchema);


module.exports = UserMedia;