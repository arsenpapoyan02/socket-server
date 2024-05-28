const { Server } = require("socket.io");
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8888; 

app.use(cors({origin: '*'}));

const httpServer = require('http').createServer(app);
const socketIO = new Server(httpServer, {
    cors: {
    origin: '*', 
    methods: ['GET', 'POST']
 },
});

app.get('/test', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    )
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, content-type"
    )
    res.end();
})

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    socket.on('message', (data) => {
        socketIO.emit('response', data);
    })
    socket.on('reaction', (data) => {
        socketIO.emit('res', data);
    })
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))