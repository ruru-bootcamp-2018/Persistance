const db = require('../db/game')
const {assignRoles, initMission, checkVotes} = require('../gameFunctions')
var router = require('express').Router()

const currentGame = require('../currentGame')

router.post('/new', (req, res) => {
  const {game_name} = req.body
  db.createGame(game_name).then(ids => {
    db.getGame(ids[0]).then(game => {
      //emit game from io???
      currentGame.game = game      
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
          currentGame.game.in_progress = true
          db.getRoles(game_id).then(roles => { 
            //emit game from io???
            currentGame.roles = roles            
            initMission(game_id)
            res.json(roles)
          })
        })        
      })
    })       
  })
})

router.post('/nominate', (req, res) => {
  //const game_id = req.body.game.id
  const user_id = req.body.nomination.user.id
  const round_id = currentGame.currentRound.id
  db.castNomination(round_id, user_id).then(() => {
    db.getNominations(round_id).then(nominations => {
      res.json(nominations)
    })
  })   
})

router.post('/vote', (req, res) => {
  const user_id = req.body.user.id
  const vote = req.body.vote
  const round_id = currentGame.currentRound.id
  db.castVote(round_id, user_id, vote).then(() => {
    checkVotes(round_id)
  })
})




module.exports = router