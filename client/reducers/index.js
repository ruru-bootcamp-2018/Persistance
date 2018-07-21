import {combineReducers} from 'redux'

import auth from './auth'
import games from './games'

export default combineReducers({
  auth,
  games,
})
