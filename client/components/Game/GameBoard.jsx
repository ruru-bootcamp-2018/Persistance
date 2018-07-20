import React from 'react'
import { connect } from 'react-redux'
import Mission from './Mission'
import Player from './Player'

import {getSingleGame} from '../../actions/games'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.dispatch(getSingleGame(1)) //needs to be dynamic
  }

  render() {
    const { users, game, missions } = this.props
    let top = Math.round(users.length / 2)


    return (
      <div className="gameBoard">
        <div className="level">
          {users.slice(0, top).map((player, i) => {
            return <Player key={i} player={player} />
          })}
        </div>
        <p className="is-size-4">Missions</p>
        <div className="level missionDisplay">
          {missions.map((mission, i) => {
            return < Mission key={`i:${i}`} mission={mission} />
          })}
        </div>
        <br />
        <div className="level">
          {users.slice(top).map((player, i) => {
            return <Player key={i} player={player} />
          })}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state, 
    users: [
      { id: 3, user_name: "plaguemulch", display_name: "Plague", img:"https://is3-ssl.mzstatic.com/image/thumb/Purple111/v4/cd/7f/f0/cd7ff0df-cb1f-8d10-6c4a-9cde28f2c5a5/source/256x256bb.jpg" },
      { id: 7, user_name: "dannash100", display_name: "Dannash100", img:"https://is3-ssl.mzstatic.com/image/thumb/Purple111/v4/cd/7f/f0/cd7ff0df-cb1f-8d10-6c4a-9cde28f2c5a5/source/256x256bb.jpg"  },
      { id: 9, user_name: "maddog", display_name: null, img:"https://is3-ssl.mzstatic.com/image/thumb/Purple111/v4/cd/7f/f0/cd7ff0df-cb1f-8d10-6c4a-9cde28f2c5a5/source/256x256bb.jpg"  },
      { id: 2, user_name: "rebduggins", display_name: "Rebdug", img:"https://is3-ssl.mzstatic.com/image/thumb/Purple111/v4/cd/7f/f0/cd7ff0df-cb1f-8d10-6c4a-9cde28f2c5a5/source/256x256bb.jpg"  },
      { id: 4, user_name: "clifford", display_name: "Cliffhanger", img:"https://is3-ssl.mzstatic.com/image/thumb/Purple111/v4/cd/7f/f0/cd7ff0df-cb1f-8d10-6c4a-9cde28f2c5a5/source/256x256bb.jpg"  }
    ],
    game: { name: "cat", id: 8, in_progress: false, is_finished: false, player_num: 7 },
    missions: [
      { mission_number: 1, outcome: "goodies won" },
      { mission_number: 2, outcome: "spies won" },
      { mission_number: 3, outcome: null },
      { mission_number: 4, outcome: null },
      { mission_number: 5, outcome: null }
    ]
  }
}


export default connect(mapStateToProps)(Game)