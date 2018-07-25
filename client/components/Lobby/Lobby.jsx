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
      .then(res => {
        const gameData = res.body
        const game_id = game.id
        const localSocket = this.props.socket
        localSocket.emit('updateWaitingRoom', gameData, game_id)
      })
  }

  render() {
    const user = this.props.auth.user
    const games = this.state.games

    return (
      <div>
        <h1 className="is-size-1 has-text-white">Welcome to the lobby</h1>
        <NewGameForm />
        <br />
        <p className="is-size-4 has-text-white">Join a game</p>
        <br />
        <div className="columns is-4 is-multiline">
          {games.map((game, i) => {
            return (
            <div key={i} className="column is-4">
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
