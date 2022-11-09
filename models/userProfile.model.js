//bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require("mongoose");

//Create our schema using mongoose that contains the fields and their data types for our Users
//More info: https://mongoosejs.com/docs/schematypes.html
const userProfileSchema = new mongoose.Schema({
    questionsAttempted: {
        type: Number, 
        required: true,
        minlength: 1
    },
    correctAnswers: {
        type: Number, 
        required: true,
        minlength: 1
    },
    wrongAnswers: {
        type: Number, 
        required: true,
        minlength: 1 
    },
    favoritesList: {
        type: [], 
        required: true,
        
    },
    email: { 
        type: String, 
        required: true, 
        index: { 
            unique: true 
        },
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    }
})


//Generate the model our code with interact with from the above schema
//Models allow us to interact with the data inside our MongoDB collections
//More info: https://mongoosejs.com/docs/models.html
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

//export our model
module.exports = UserProfile;