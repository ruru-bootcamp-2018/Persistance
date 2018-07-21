import {combineReducers} from 'redux'

import auth from './auth'
import games from './games'
import users from './users'
import game from './game'
import currentGame from './currentGame'
import socket from './socket'

export default combineReducers({
  auth,
  games,
  users,
  game,
  currentGame,
  currentMission,
  currentRound,
  socket,
  missionParams
})
