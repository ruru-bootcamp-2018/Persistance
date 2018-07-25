const currentGames = {}

function initGame(game_id){
  currentGames[game_id] = {
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

module.exports = {currentGames, initGame}