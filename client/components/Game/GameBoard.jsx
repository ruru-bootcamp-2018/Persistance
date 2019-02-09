import React from 'react'
import { connect } from 'react-redux'

import Mission from './Mission'
import Player from './Player'
import RoundCounter from './RoundCounter'

import { getPlayers } from '../../actions/games'
import { getGames } from '../../api/games'
import { updateCurrentGame } from '../../actions/currentGame'

export class GameBoard extends React.Component {
  render() {
    const {currentGame} = this.props
    const {
      players,
      missions,
      currentMission,
      currentRound
    } = currentGame

    const { hammer_id } = currentMission
    const { round_num, leader_id } = currentRound

    // index to decide who gets rendered on top and who gets rendered on bottom
    const halfPlayersIndex = Math.round(players.length / 2)

    // this stuff fixed a problem with mission array only being as long as mission exists

    const missionDisplay = Array(5).fill(0).map((x, i) =>
      missions[i] ? missions[i] : {outcome: null}
    )
    
    return (
      <div className="columns">
        <div className="column is-2">
          {players.slice(0, halfPlayersIndex).map((player, i) => {
            return <Player key={i} player={player} leader={leader_id} hammer={hammer_id}/>
          })}
        </div>
        <div className='column is-8'>
          <h1>{players.map((x, i) => {
            if (x.role == 'spy') return <img key={i} className="spyIcon" src="/spy.png" />
          })}</h1>

        <div className="mission-board">
        <p className="is-size-3 has-text-white">Missions</p>
        <div className="level missionDisplay">
          {missionDisplay.map((mission, i) => {
            return <Mission key={i} mission={mission} number={i}  />
          })}

        </div>
        <p className="voteTrack is-size-3 has-text-white">Vote Track</p>
        <div className="columns is-centered">
                 {Array(5).fill(0).map((x, i) => {
          return <RoundCounter key={i} number={i + 1} round_num={round_num}/>
         })}
        </div>
      </div>
      </div>


        <div className="column is-2">
          {players.slice(halfPlayersIndex).map((player, i) => {
            return <Player key={i} player={player} leader={leader_id} hammer={hammer_id}/>
          })}
        </div>
      </div>

    )
  }
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(GameBoard)
