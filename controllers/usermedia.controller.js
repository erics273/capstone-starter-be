const UserMedia = require("../models/usermedia.model");

const userMediaController = {

    addMedia: async function(req, res) {

        try {

            //store user data sent through the request
            const mediaData = req.body;

            //pass the userData to the create method of the User model
            let newMediaItem = await UserMedia.create(mediaData)

            //return the newly created user
            res.status(201).json(await UserMedia.findById(newMediaItem._id))
            
        } catch (error) {
            //handle errors creating user
            console.log("failed to create media item: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    },
    getMedia: async function(req, res) {

        res.status(200).json(await UserMedia.find({email: "ArthurBrockelman@gmail.com"}))
    }

}

module.exports = userMediaController;
