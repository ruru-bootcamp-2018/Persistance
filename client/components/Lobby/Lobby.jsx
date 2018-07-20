import React from 'react'
import { connect } from 'react-redux'
import NewGameForm from './NewGameForm'
import { Link } from 'react-router-dom'

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    console.log(this.props)
    const games = this.props.games

    return (
      <div>
        <h1 className="is-size-1">I am a lobby</h1>
        <NewGameForm />
        <br />
        <p className="is-size-5">Join a game</p>
        {games.filter(game => {
          return !game.in_progress && !game.is_finished && game.player_num < 10
        })
        .map(game => {
          return <Link className="button" to={`/game/${game.id}`}>{game.name}</Link>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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