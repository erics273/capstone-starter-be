const request = require("request")
const tasteDiveController = {

    tasteDiveGetRelatedMedia: async function (req, res) {
        let MediaName = req.query.MediaName
        console.log(MediaName)
        request.get(`https://tastedive.com/api/similar?q=${MediaName}&info=1&limit=10&verbose=1`, function (error, response, body) {
            res.send(response)
          }
        )
    }
}

module.exports = tasteDiveController;