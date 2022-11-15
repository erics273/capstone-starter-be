const mongoose = require("mongoose");

const userMediaSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
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
    createDateTime: 
    {type: Date, 
     default: Date.now
    } 
});
// test comment for git
userMediaSchema.index(
    {email: 1, mediaName: 1 }, 
    {unique: true });

const UserMedia = mongoose.model('UserMedia', userMediaSchema);

module.exports = UserMedia;