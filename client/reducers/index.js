import {combineReducers} from 'redux'

import auth from './auth'
import games from './games'
import users from './users'

export default combineReducers({
  auth,
  games,
  users
})
