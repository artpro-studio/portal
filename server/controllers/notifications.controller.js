const app = require('express')()
const bodyParser = require('body-parser');
const server = require('http').createServer(app)

module.exports.push = (req, res, next) => {
    try {
        req.io.sockets.to(req.body.rooms).emit('newPush', {
            title: req.body.title,
            text: req.body.text,
            error: req.body.error,
            room: req.body.rooms,
        });
        res.json({ status: true })
    } catch (e) {
        res.status(404).json({ status: false, error: e })
    }

}
