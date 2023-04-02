let express = require("express");
let app = express()

let server = require("http").createServer(app);
let io = require("socket.io")(server, {cors : {origin: "*"}});

app.set("view engine", "ejs");

app.get("/", (req, res) => {

    res.render("index.ejs")
})

io.on("connect", (socket) => {

    socket.on("message", (data) => {

        socket.broadcast.emit("message", data)
    })
})

server.listen(3000, (error) => {

    if(error){

        console.log(`AL ERROR!`);
    }else{

        console.log("Server is running . . . ");
    }
})




