import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Login from './Auth/Login'
import Register from './Auth/Register'
import Nav from './Nav'
import Lobby from './Lobby/Lobby'
import Game from './Game/Game'


const App = () => (
  <Router>
    <div className='app-container has-text-centered'>
      <h1 className="title is-1">Persistence</h1>
      <Route path="/" component={Nav} />
      <Route path="/login" component={Login} />
      <Route path="/Register" component={Register} />
      <Route path="/lobby" component={Lobby} />
      <Route exact path="/:id" component={Game} />
    </div>
  </Router>
)

export default App
