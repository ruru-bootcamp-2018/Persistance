const currentsGames = {}

function initGame(game_id){
  currentGame[game_id] = {
    game: {},
    players: [],
    currentMission: {},
    currentRound: {},
    gameStage: "waiting",
    missionParams: [],
    missions: []
  }
}

const initalGame = {
  game: {},
  players: [],
  currentMission: {},
  currentRound: {},
  gameStage: "waiting",
  missionParams: [],
  missions: []
}

module.exports = {currentGame, initGame}