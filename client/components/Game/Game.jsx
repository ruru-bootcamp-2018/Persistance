import React from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import ReadyButton from './ReadyButton'
import StatusBar from './StatusBar'


//
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.startGame = this.startGame.bind(this)
  }


  startGame() {
  }

  endGame() {
  }

  render() {
    const { playerNumber } = this.props


  }

  render() {
    const { playerNumber, host_id, user_id } = this.props

    return (
      <div>
        <StatusBar />
        {playerNumber >= 5 && user_id == host_id && <ReadyButton />}
        <GameBoard />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

  id: 9,
  playerNumber: 5,
  in_progress: false,
  is_finished: false,
  host_id: 10,
  user_id: 10

})


export default connect(mapStateToProps)(Game)