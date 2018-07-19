const db = require('../db/game')
const {assignRoles} = require('../gameFunctions')
var router = require('express').Router()

let currentGame = {}

router.post('/new', (req, res) => {
  const {game_name} = req.body
  db.createGame(game_name).then(ids => {
    db.getGame(ids[0]).then(game => {
      //emit game from io???
      res.json(game)
    })   
  })
})

router.post('/join', (req, res) => {
  const game_id = req.body.game.id
  const user_id = req.body.user.id
  db.roleEntry(game_id, user_id).then(() => {
    //emit game from io???
    res.json({game_id, user_id})
  })
})

router.post('/start', (req, res) => {
  const game_id = req.body.game.id  
  db.getRoles(game_id).then(roles => {        
    assignRoles(roles)    
    db.delRoles(game_id).then(() => {
      db.setRoles(roles).then(() => {
        db.startGame(game_id).then(() => {
          db.getRoles(game_id).then(roles => { 
            //emit game from io???
            res.json(roles)
          })
        })        
      })
    })       
  })
})



module.exports = router