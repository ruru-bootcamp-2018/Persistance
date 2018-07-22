module.exports = app => {
    const http = require('http').Server(app)
    var io = require('socket.io')(http)

    io.on('connection', (socket) => {
        //here we make the socket do all the behaviour/listening we care about. 

        console.log(`A user connected at ${new Date}`)
        socket.on('disconnect', () => {
            console.log(`A user disconnected at ${new Date}`)
        })
        socket.on('chat-down', (msg) => {
            console.log(msg)
            io.emit('chat-up', msg)
        })

    });

    return io;
}