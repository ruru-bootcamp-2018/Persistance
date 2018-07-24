require('dotenv').config()

var server = require('./server')
var PORT = process.env.PORT || 3000

// const beNice = process.env.NODE_ENV == 'production' ? null : require('../../terminal-sweetness')

const http = server.listen(PORT, function () {
  console.log('Listening on port', PORT)
  // if (beNice) beNice();

})

// const http = require('http').Server(app)
const socket = require('./sockets')(http)
server.set('socket', socket)
// socket.listen(PORT)
