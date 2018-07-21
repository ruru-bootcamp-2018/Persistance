const db = require('../db/game')
const {assignRoles, initMission, checkVotes, checkIntentions} = require('../gameFunctions')
var router = require('express').Router()

const {currentGame, initalGame} = require('../currentGame')
const mission2 = require('../fakeData/mission2')

router.get('/open', (req, res) => {
  db.getOpenGames().then(games => {
    res.json(games)
  })
})

router.get('/current', (req, res) => {
  const {game, players, gameStage, missions, currentRound, currentMission, missionParams} = currentGame
  res.json({currentGame: {game, players, gameStage, missions}, currentRound, currentMission, missionParams})
})

router.get('/fake', (req, res) => {
  res.json(mission2)
})

router.post('/new', (req, res) => {
  const {game_name} = req.body
  Object.assign(currentGame, initalGame)
  currentGame.missions = []
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
    db.getPlayers(game_id).then(players => {
      currentGame.players = players
      //emit game from io???    
      res.json(players)
    })
    
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
          db.getPlayers(game_id).then(players => {             
            currentGame.players = players
            db.getMissionParams(players.length).then(missionParams => {
              currentGame.missionParams = missionParams
              initMission(game_id)
              //emit game from io???
              res.json(players)
            })           
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
  const round_num = currentGame.currentRound.round_num
  const mission_num = currentGame.currentMission.mission_num  
  db.castNomination(round_id, user_id).then(() => {
    db.getNominations(round_id).then(nominations => {
      currentGame.missions[mission_num-1].rounds[round_num-1].nominations = nominations
      res.json(nominations)
    })
  })   
})

router.post('/vote', (req, res) => {
  const user_id = req.body.user.id
  const vote = req.body.vote
  const round_id = currentGame.currentRound.id
  db.castVote(round_id, user_id, vote).then(() => {
    console.log('vote recieved')
    checkVotes(round_id)
    res.sendStatus(200)
  })
})

router.post('/intention', (req, res) => {
  const user_id = req.body.user.id
  const intention = req.body.intention
  const mission_id = currentGame.currentMission.id
  db.castIntention(mission_id, user_id, intention).then(() => {
    checkIntentions(mission_id)
    res.sendStatus(200)
  })
})

module.exports = router