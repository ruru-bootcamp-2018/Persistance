import React from 'react'
import { connect } from 'react-redux'
import Mission from './Mission'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { users, game, missions } = this.props
    return (
      <div>
        <div className="level">
          {users.map(user => {
            return <p className="is-level-item is-size-4">{user.display_name || user.user_name}</p>
          })}
        </div>
        <p className="is-size-4">Missions</p>
        <div className="level">
          {missions.map((mission) => {
            return <Mission mission={mission} />
          })}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: [
      { id: 3, user_name: "plaguemulch", display_name: "Plague" },
      { id: 7, user_name: "dannash100", display_name: "Dannash100" },
      { id: 9, user_name: "maddog", display_name: null },
      { id: 2, user_name: "rebduggins", display_name: "Rebdug" },
      { id: 4, user_name: "clifford", display_name: "Cliffhanger" }
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