const express = require('express')
const app = express()
const http = require('http').createServer(app)

http.listen(3000, () => {
    console.log('Listening on port 3000')
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html')
    //res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

app.get('/assistant' , (req , res)=>{

   // res.send("Hello");
    res.sendFile(__dirname + '/myassistant.html')

})