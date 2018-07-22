import React from 'react'
import { connect } from 'react-redux'
import NewGameForm from './NewGameForm'
import { Link } from 'react-router-dom'
import ChatWindow from '../Game/ChatWindow'
import request from '../../utils/api'



const buttonStyling = "button is-medium is-fullwidth is-primary is-outlined"

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }
  componentDidMount() {
    request('get', './game/open').then((res) => {
      this.setState({
        games: res.body
      })
    })
  }

  render() {

    const games = this.state.games

    return (
      <div>
        <h1 className="is-size-1">Welcome to the lobby</h1>
        <NewGameForm />
        <br />
        <p className="is-size-4">Join a game</p>
        <br />
        <div className="columns is-4 is-multiline">
          {games.map(game => {
            return (
            <div className="column is-4">
              <Link className={buttonStyling} to={`/game/${game.id}`}>{game.game_name}</Link>
            </div>
            )
          })}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Lobby)
