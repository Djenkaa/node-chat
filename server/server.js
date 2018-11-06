const path = require('path');
const http = require('http');
const moment = require('moment');
const {isString} = require('./utils/validation.js');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on("connect", function (socket) {
    console.log("New user connected !");

     socket.emit("messages", {
         name: "Admin",
         text: "Hello to everyone !",
    
     });
     socket.on("join", function(params){
        
     });

    socket.on("newMess", function (mess) {
        console.log(`New message ${mess}`);
        
        io.emit("messages", {
            name:mess.name,
            text:mess.text,
            timeStamp:moment(mess.timeStamp).format('lll'),
        });


    })



    socket.on("disconnect", function () {
        console.log("User was disconnected");
    });

});



server.listen(port, function () {
    console.log(`Server is up on ${port}`);
});