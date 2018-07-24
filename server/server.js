var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var passport = require('passport')

var server = express()

server.use(cors('*'))

server.use(passport.initialize())
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.get('/game/*', (req, res) => {
    res.redirect('/lobby')
})

server.get('/waiting/*', (req, res) => {
    res.redirect('/lobby')
})

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})



server.use('/api/auth', require('./routes/auth'))
server.use('/api/game', require('./routes/game'))
server.use('/api/temporary', require('./routes/temporary'))

module.exports = server
