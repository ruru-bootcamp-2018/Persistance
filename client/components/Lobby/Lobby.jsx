import React from 'react'
import { connect } from 'react-redux'
import NewGameForm from './NewGameForm'
import { Link } from 'react-router-dom'
import ChatWindow from '../Game/ChatWindow'


//this is a mess but al good we on it!!!!!!


class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    
    const games = this.props.games

    return (
      <div>
        <h1 className="is-size-1">Welcome to the lobby</h1>
        <NewGameForm />
        <br />
        <p className="is-size-4">Join a game</p>
        <div className="tile is-parent">
          {games.filter(game => {
            return !game.in_progress && !game.is_finished && game.player_num < 10
          })
            .map(game => {
              return <Link className="button is-medium is-fullwidth is-primary is-outlined tile is-child"
              to={`/game/${game.id}`}>{game.name}</Link>
            })}



        </div>
        no more chat window here
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth : state.auth,
    socket : state.socket,
    games: [
      { name: "dog", id: 5, in_progress: true, is_finished: false, player_num: 5 },
      { name: "cat", id: 8, in_progress: false, is_finished: false, player_num: 7 },
      { name: "frog", id: 5, in_progress: false, is_finished: true, player_num: 9 },
      { name: "bear", id: 8, in_progress: false, is_finished: true, player_num: 5 },
      { name: "elephant", id: 5, in_progress: false, is_finished: false, player_num: 9 }
    ]
  }

}

export default connect(mapStateToProps)(Lobby)
