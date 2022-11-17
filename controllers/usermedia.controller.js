const UserMedia = require("../models/usermedia.model");

const userMediaController = {

        //method to get all users using async/await syntax
        getAllMedia: async function(req, res){

            //create base query
            let query = {}
      
            //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
            try {
                
                //use our model to find users that match a query.
                //{} is the current query which really mean find all the users
                //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code

                console.log("getAllMedia - query: " + query);

                let allMedia = await UserMedia.find(query)
                
                //return all the users that we found in JSON format
                res.json(allMedia)
                
            } catch (error) {
                console.log("error getting all Media: " + error)
                //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
                res.status(400).json({
                    message: error.message,
                    statusCode: res.statusCode
                })
    
            }
        },

 //method to get all users using async/await syntax
 getAllMediaRatingCounts: async function(req, res){

    //create base query
    let query = {}

    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
        
        //use our model to find users that match a query.
        //{} is the current query which really mean find all the users
        //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code

        console.log("getAllMediaRatingCounts - query: " + query);

        let getAllMediaRatingCounts = await UserMedia.aggregate([
            { "$group" : { "_id" : { "mediaRating": "$mediaRating"}, "count": { "$sum" : 1 } } }, 
            { "$project" : {"_id" : 0, "mediaRating" : "$_id.mediaRating",  "count":1 } } ,
            { $sort : { mediaRating : 1 } }
        ])
        
        //return all the users that we found in JSON format
        res.json(getAllMediaRatingCounts)
        
    } catch (error) {
        console.log("error getting getAllMediaRatingCounts: " + error)
        //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })

    }
},



        //method to get all users using async/await syntax
    getMediaForUser: async function(req, res){

        console.log("getMediaForUser - beginning of function" );

        //create base query
        let query = {}

        const userEmail = req.params.email;

        console.log("getMediaForUser - userEmail: " + userEmail);


        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            //use our model to find users that match a query.
            //{} is the current query which really mean find all the users
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            console.log("getMediaForUser - query: " + query);

            let allMediaForUser = await UserMedia.find(({email: userEmail}))
            
            //return all the users that we found in JSON format
            res.json(allMediaForUser)
            
        } catch (error) {
            console.log("error getting all media for user: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },


    createMedia: async function(req, res) {

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

     //method to update a user
     updateUserMedia: async function(req, res, next){

        try {


            console.log("inside updateUserMedia")

            //get the user email from the request params
            const email = req.params.email;
            const mediaName = req.params.medianame;

            //store user data sent through the request
            const newUserMediaData = req.body;

            //try to find our user by the email provided in the request params
            const userMedia = await UserMedia.findOne({email: email, medianame:mediaName})

            //update the user if we found a match and save or return a 404
            if(userMedia){
                Object.assign(userMedia, newUserMediaData)
                await userMedia.save()
            }else{
                res.status(404).send({message: "User Media not found", statusCode: res.statusCode});
            }

            //respond with updated user
            res.json(await UserMedia.findById(userMedia._id))
            
        } catch (error) {
            console.log("failed to update user media: " + error)
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
