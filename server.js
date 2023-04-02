let express = require("express")
let ejs = require('ejs')


let app = express()





let {Server} = require("socket.io")

let io = new Server({cors: {origin: "* "}})

let users = {}

io.on("connection", socket => {

    console.log("New User!")
    socket.on("new-user", name => {

        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    })

    socket.emit("chat-message", "Hello World!")

    socket.on("send-chat-message", (message) => {

       socket.broadcast.emit("chat-message",{message: message, name: users[socket.id]})
    })

    socket.on("disconnect", () => {

        socket.broadcast.emit(`user-disconnected`, users[socket.id])
        delete users[socket.id]
    })
})

io.listen(3000)