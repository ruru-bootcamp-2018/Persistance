const db = require('./db/game')

module.exports = http => {
    var io = require('socket.io')(http)

    io.on('connection', (socket) => {
        /* The first thing the controller does when a socket attaches
            is console log a new connection
        */
        console.log(`A user connected at ${new Date}`)

        //Then it puts all the listeners on that socket.
        socket.on('disconnect', () => {
            console.log(`A user disconnected at ${new Date}`)
        })
        // this is copied from socket-voting
        socket.on('createGame', (id)=> {
          console.log({id}, 'socket createGame');
            socket.join(id) //join a Game
            //io.emit('addGame', game) //add created Game to all connected users
            io.to(id).emit('joinGame', id) //new user will join created Game on client side
        })

        socket.on('joinGame', (id, user_name) => {
            socket.join(id) //socket joins existing Game
            console.log("you have joined room" + id)
            io.to(id).emit('joinGame', id, user_name)
            //tell client about the joined Game
        })
        // tis is copied form socket-voting

        socket.on('chat-down', (gameID, msg) => {
            console.log(msg)
            //io.emit('chat-up', msg) //This is global
            io.to(gameID).emit('chat-up', msg) //This is Game specific
        })

        socket.on('updateWaitingRoom', (gameData, gameId) => {
            io.to(gameId).emit('receiveUpdateWaiting', gameData)
        })

        socket.on('updateGameRoom', (gameData, gameId) => {
            io.to(gameId).emit('receiveUpdateGame', gameData)
        })


        socket.on('getGames', () => {
            db.getOpenGames().then(games => {
              console.log({games});
                io.emit('receiveGames', games)
            })
        })

    });

    return io;
}
