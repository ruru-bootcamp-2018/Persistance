const db = require('../db/game')
const {assignRoles, initMission, checkVotes, checkIntentions, checkNominations} = require('../gameFunctions')
var router = require('express').Router()
var token = require('../auth/token')


const {currentGames, initGame} = require('../currentGames')


router.post('/new', token.decode,(req, res) => {
  const {game_name, user} = req.body
  // Object.assign(currentGame, initalGame)
  // currentGame.missions = []
  db.createGame(game_name, user.id).then(ids => { 
    const game_id = ids[0]
    initGame(game_id)
    db.getGame(ids[0]).then(game => {
      console.log('new game')
      currentGames[game_id].game = game
      res.json(game)
    })
  })
})

router.post('/join', token.decode,(req, res) => {
  const game_id = req.body.game.id
  if (currentGames[game_id].gameStage !== 'waiting') return res.sendStatus(400)
  if (currentGames[game_id].players.length >= 10) return res.sendStatus(400)  
  const user_id = req.body.user.id
  db.getPlayers(game_id).then(playersList => {        
    if (playersList.find(x => x.id == user_id)) return res.sendStatus(400)
    db.roleEntry(game_id, user_id).then(() => {
      db.getPlayers(game_id).then(playersList => {
        currentGames[game_id].players = playersList
        const {game, players, gameStage, missions, currentRound, currentMission, missionParams} = currentGames[game_id]
        const gameData = {currentGame: {game, players, gameStage, missions, currentRound, currentMission}, missionParams}
        res.json(gameData)
      })
  
    })
  })
  
})

router.post('/start', token.decode,(req, res) => {
  const game_id = req.body.game.id
  if (currentGames[game_id].gameStage !== 'waiting') return res.sendStatus(400)
  if (currentGames[game_id].players.length < 5) return res.sendStatus(400)  
  db.getRoles(game_id).then(roles => {
    assignRoles(roles)
    db.delRoles(game_id).then(() => {
      db.setRoles(roles).then(() => {
        db.startGame(game_id).then(() => {
          currentGames[game_id].game.in_progress = true
          db.getPlayers(game_id).then(playersList => {
            currentGames[game_id].players = playersList
            db.getMissionParams(playersList.length).then(missionParams => {
              currentGames[game_id].missionParams = missionParams
              initMission(game_id).then(() => {
                console.log('game started')
                const {game, players, gameStage, missions, currentRound, currentMission, missionParams} = currentGames[game_id]
                const gameData = {currentGame: {game, players, gameStage, missions, currentRound, currentMission}, missionParams}
                res.json(gameData)
              })
            })
          })
        })
      })
    })
  })
})


router.post('/nominate', token.decode,(req, res) => {
  const game_id = req.body.game.id
  if (currentGames[game_id].gameStage !== 'nominating') return res.sendStatus(400)  
  const user_id = req.body.nomination.user.id
  const username = req.body.nomination.user.display_name
  const round_id = currentGames[game_id].currentRound.id
  const round_num = currentGames[game_id].currentRound.round_num
  const mission_num = currentGames[game_id].currentMission.mission_num
  db.castNomination(round_id, user_id, username).then(() => {
    db.getNominations(round_id).then(nominations => {
      console.log('nomination recieved')
        currentGames[game_id].missions[mission_num-1].rounds[round_num-1].nominations = nominations
        const {game, players, gameStage, missions, currentRound, currentMission, missionParams} = currentGames[game_id]
        const gameData = {currentGame: {game, players, gameStage, missions, currentRound, currentMission}, missionParams}
        res.json(gameData)
    })
  })
})

router.post('/remove', token.decode,(req, res) => {
  const game_id = req.body.game.id
  if (currentGames[game_id].gameStage !== 'nominating') return res.sendStatus(400)  
  const user_id = req.body.nomination.user.id
  const round_id = currentGames[game_id].currentRound.id
  const round_num = currentGames[game_id].currentRound.round_num
  const mission_num = currentGames[game_id].currentMission.mission_num  
  db.removeNomination(round_id, user_id).then(() => {
    db.getNominations(round_id).then(nominations => {
      console.log('nomination removed')
        currentGames[game_id].missions[mission_num-1].rounds[round_num-1].nominations = nominations
        const {game, players, gameStage, missions, currentRound, currentMission, missionParams} = currentGames[game_id]
        const gameData = {currentGame: {game, players, gameStage, missions, currentRound, currentMission}, missionParams}
        res.json(gameData)
    })
  })   
})

router.post('/confirmNoms', token.decode,(req, res) => {
  const game_id = req.body.game.id
  if (currentGames[game_id].gameStage !== 'nominating') return res.sendStatus(400)  
  const round_id = currentGames[game_id].currentRound.id
  checkNominations(game_id, round_id).then(() => {
    const {game, players, gameStage, missions, currentRound, currentMission, missionParams} = currentGames[game_id]
    const gameData = {currentGame: {game, players, gameStage, missions, currentRound, currentMission}, missionParams}
    res.json(gameData)
  })
})

router.post('/vote', token.decode,(req, res) => {
  const game_id = req.body.game.id
  if (currentGames[game_id].gameStage !== 'voting') return res.sendStatus(400)  
  const user_id = req.body.user.id
  const vote = req.body.vote
  const round_id = currentGames[game_id].currentRound.id
  db.castVote(round_id, user_id, vote).then(() => {
    console.log('vote received')
    checkVotes(game_id, round_id).then(() => {
      const {game, players, gameStage, missions, currentRound, currentMission, missionParams} = currentGames[game_id]
      const gameData = {currentGame: {game, players, gameStage, missions, currentRound, currentMission}, missionParams}
      res.json(gameData)
    })

  })
})

router.post('/intention', token.decode,(req, res) => {
  const game_id = req.body.game.id
  if (currentGames[game_id].gameStage !== 'intentions') return res.sendStatus(400)  
  const user_id = req.body.user.id
  const intention = req.body.intention
  const mission_id = currentGames[game_id].currentMission.id
  db.castIntention(mission_id, user_id, intention).then(() => {
    console.log('intention recieved')
    checkIntentions(game_id, mission_id).then(() => {
      const {game, players, gameStage, missions, currentRound, currentMission, missionParams} = currentGames[game_id]
      const gameData = {currentGame: {game, players, gameStage, missions, currentRound, currentMission}, missionParams}
      res.json(gameData)
    })

  })
})

module.exports = router
