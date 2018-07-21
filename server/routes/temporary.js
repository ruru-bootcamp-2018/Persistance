const db = require('../db/game')
var router = require('express').Router()

router.get('/games', (req, res) => {
    db.getGames()
    .then(games => {
        res.json(games)
    })
})

router.get('/roles/:id', (req, res) => {
    const id = req.params.id
    db.getRoles(id)
    .then(roles => {
        res.json(roles)
    })
})





module.exports = router