import React from 'react'
import { connect } from 'react-redux'
import Mission from './Mission'
import Player from './Player'
import RoundCounter from './RoundCounter'
import DataButton from './DataButton'
import { getGames, getPlayers } from '../../actions/games'
import { updateCurrentGame } from '../../actions/currentGame'

class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    const { players, game, missions } = this.props.currentGame
    const { mission_num } = this.props.currentGame.currentMission
    const { round_num, leader_id } = this.props.currentGame.currentRound

    const leader = players.find(player => player.id == leader_id)
    // index to decide who gets rendered on top and who gets rendered on bottom
    const halfPlayersIndex = Math.round(players.length / 2)

    // finding the hammer
    const initialLeader = this.props.currentGame.missions[mission_num - 1].rounds[0].leader_id
    const initialLeaderIndex = players.findIndex(x => x.id == initialLeader)
    const hammer = players[initialLeaderIndex + 4 % (players.length - 1)].id


    // this stuff fixed a problem with mission array only being as long as mission exists

    const missionDisplay = Array(5).fill(0).map((x, i) => {
      return missions[i] ? missions[i] : {outcome: null}
    })

    return (
      <div className="gameBoard">
        <div className="level">
          {players.slice(0, halfPlayersIndex).map((player, i) => {
            return <Player key={i} player={player} leader={leader_id} hammer={hammer}/>
          })}
        </div>
        
        <h1 className="is-size-3 has-text-black"><i className="fas fa-crown"></i>{`${leader.user_name} is the leader`}</h1>

        <div className="background-image">
        <p className="is-size-3 has-text-white">Missions</p>
        <div className="level missionDisplay">
          {missionDisplay.map((mission, i) => {
            return <Mission key={i} mission={mission} number={i}  />
          })}

        </div>
        <p className="voteTrack is-size-3 has-text-white">Vote Track</p>
        <div className="columns is-centered">
                 {Array(5).fill(0).map((x, i) => {
          return <RoundCounter number={i + 1} round_num={round_num}/>
         })}
        </div>

      </div>
        <DataButton />
        <br />
        <div className="level">
          {players.slice(halfPlayersIndex).reverse().map((player, i) => {
            return <Player key={i} player={player} leader={leader_id} hammer={hammer}/>
          })}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(GameBoard)
