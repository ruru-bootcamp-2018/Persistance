require('dotenv').config()

var server = require('./server')
var PORT = process.env.PORT || 3000

// const beNice = process.env.NODE_ENV == 'production' ? null : require('../../terminal-sweetness')

server.listen(PORT, function () {
  console.log('Listening on port', PORT)
  // if (beNice) beNice();

})
