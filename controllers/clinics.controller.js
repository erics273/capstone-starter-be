//Import our model so we can us it to interact with the realated data in MongoDB
const Clinic = require("../models/clinics.model")


//build our controller that will have our CRUD and other methods for our clinics
const clinicsController = {

    //method to get all users using async/await syntax
    getClinics: async function(req, res){

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            //use our model to find users that match a query.
            //{} is the current query which really mean find all the clinics
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let allClinics = await Clinic.find({})
            
            //return all the clinics that we found in JSON format
            res.json(allClinics)
            
        } catch (error) {
            console.log("error getting all clinics: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any clinics
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
      }
}


module.exports = clinicsController;

