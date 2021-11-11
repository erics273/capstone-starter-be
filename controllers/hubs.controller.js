const Hub = require("../models/hubs.model")


//build our controller that will have our CRUD and other methods for our hub
const hubsController = {
    getHubs: async function (req, res) {
//create query to find hubs
        let query = {}
        if(req.query.upsHubName){
          const regex = new RegExp(`.*${req.query.upsHubName}.*$`, "i")
          query.upsHubName = {'$regex':regex}
        }

        if(req.query.upsRiskManager){
            const regex = new RegExp(`.*${req.query.upsRiskManager}.*$`, "i")
            query.upsRiskManager = {'$regex':regex}
          }

          if(req.query.address){
            const regex = new RegExp(`.*${req.query.address}.*$`, "i")
            query.address = {'$regex':regex}
          }

        try {
            //use our model to find hubs that match query
            let allHubs = await Hub.find(query)
            res.json(allHubs)

        } catch (error) {
            console.log("error getting all hubs: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },
    //method to update a hub
    updateHub: async function (req, res, next) {
        try {
            const hubId = req.params.id;
            const newHubData = req.body;
            const hub = await Hub.findById(hubId);

            if (hub) {
                Object.assign(hub, newHubData)
                await hub.save()
            } else {
                res.status(404).send({ message: "Hub not found", statusCode: res.statusCode });
            }

            res.json(await Hub.findById(hub._id))

        } catch (error) {
            console.log("failed to update hub: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    },
    //method to create a new client
    createHub: async function (req, res) {
        try {
            const hubData = req.body;
            let newHub = await Hub.create(hubData)

            res.status(201).json(await Hub.findById(newHub._id))

        } catch (error) {
            //handle errors creating a Hub
            console.log("failed to create hub: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    },
    //method to delete a hub
    deleteHub: async function (req, res, next) {
        try {

            const hubId = req.params.id;
            const hub = await Hub.findById(hubId);

            if (hub) {
                Hub.deleteOne(hub, (error) => {
                    if (error)
                        throw error});
                res.status(202).send({ message: "Hub deleted", statusCode: res.statusCode });
            } else {
                res.status(404).send({ message: "Hub not found to delete", statusCode: res.statusCode });
            }
        } catch (error) {
            console.log("failed to delete hub: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    }
}


module.exports = hubsController;

