import React from 'react'
import { connect } from 'react-redux'
import NewGameForm from './NewGameForm'
import { Link } from 'react-router-dom'
import ChatWindow from '../Game/ChatWindow'
import { joinGame } from '../../actions/playerInputs'




const buttonStyling = "button is-medium is-fullwidth is-primary is-outlined"

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }


  componentDidMount() {
    const { socket } = this.props
    socket.emit('getGames', () => {
    })
    socket.on('receiveGames', (games) => {
      this.setState({
        games: games
      })
  })
}
  clickJoinGame(game, user) {
    joinGame({game, user})
  }

  render() {
    const user = this.props.auth.user
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
              <Link onClick={() => this.clickJoinGame(game, user)} className={buttonStyling} to={`/waiting/${game.id}`}>{game.game_name}</Link>
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
