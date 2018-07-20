import React from 'react'
import { connect } from 'react-redux'
import Mission from './Mission'
import {getSingleGame, getPlayers, receiveGames} from '../../actions/games'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      games: []
    }
  }
  componentDidMount(){
    this.props.dispatch(getSingleGame(1))
    this.props.dispatch(getPlayers(1))
  }

  render() {
    const { users, game, missions } = this.props
    let top = Math.round(users.length / 2)
 
    
    return (
      <div className="gameBoard">
        <div className="level">
          {users.slice(0, top).map((user, i )=> {
            return <p key={`i:${i}`} className="is-level-item is-size-4">{user.display_name || user.user_name}</p>
          })}
        </div>
        <p className="is-size-4">Missions</p>
        <div className="level missionDisplay">
          {missions && missions.map((mission, j) => {
            return < Mission key={`j:${j}`} mission={mission} />
          })}
        </div>
        <br/>
        <div className="level">
          {users.slice(top ).map((user, k )=> {
            return <p key={`k:${k}`} className="is-level-item is-size-4">{user.display_name || user.user_name}</p>
          })}
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({users, games}) => {

  return {
    users,
    games
    // users: [
    //   { id: 3, user_name: "plaguemulch", display_name: "Plague" },
    //   { id: 7, user_name: "dannash100", display_name: "Dannash100" },
    //   { id: 9, user_name: "maddog", display_name: null },
    //   { id: 2, user_name: "rebduggins", display_name: "Rebdug" },
    //   { id: 4, user_name: "clifford", display_name: "Cliffhanger" }
    // ],
    // game: { name: "cat", id: 8, in_progress: false, is_finished: false, player_num: 7 },
    // missions: [
    //   { mission_number: 1, outcome: "goodies won" },
    //   { mission_number: 2, outcome: "spies won" },
    //   { mission_number: 3, outcome: null },
    //   { mission_number: 4, outcome: null },
    //   { mission_number: 5, outcome: null }
    // ]
  }
}


export default connect(mapStateToProps)(Game)