import React from 'react'
import { connect } from 'react-redux'
import Mission from './Mission'
import Player from './Player'
import RoundCounter from './RoundCounter'
import { getGames, getPlayers } from '../../actions/games'
import { updateCurrentGame } from '../../actions/currentGame'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { players, game, missions } = this.props.currentGame
    const { mission_num } = this.props.currentMission
    const { round_num } = this.props.currentRound
  
    // index to decide who gets rendered on top and who gets rendered on bottom
    const halfPlayersIndex = Math.round(players.length / 2)
    
    // this stuff fixed a problem with mission array only being as long as mission exists

    const missionDisplay = Array(5).fill(0).map((x, i) => {
      return missions[i] ? missions[i] : {outcome: null}
    })

    return (
      <div className="gameBoard">
        <div className="level">
          {players.slice(0, halfPlayersIndex).map((player, i) => {
            return <Player key={i} player={player} />
          })}
        </div>
        <p className="is-size-4">Missions</p>

        <div className="level missionDisplay">
          {missionDisplay.map((mission, i) => {
            return <Mission key={i} mission={mission} number={i} />
          })}

        </div>
        <p className="voteTrack is-size-5">Vote Track</p>
        <div className="columns is-centered">
                 {Array(5).fill(0).map((x, i) => {
          return <RoundCounter number={i + 1} round_num={round_num}/>
         })}
        </div>

        <br />
        <div className="level">
          {players.slice(halfPlayersIndex).map((player, i) => {
            return <Player key={i} player={player} />
          })}
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ currentGame, currentMission, currentRound }) => {
  return {
    currentGame,
    currentMission,
    currentRound
  }
}

export default connect(mapStateToProps)(Game)
