require('dotenv').config()

var server = require('./server')
var PORT = process.env.PORT || 3000
//const beNice = require('../../terminal-sweetness')

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}, time is ${new Date}`, PORT)
  //beNice();
})
