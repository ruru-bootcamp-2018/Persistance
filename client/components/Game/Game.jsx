import React from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import Buttons from './Buttons'
import StatusBar from './StatusBar'
import ChatWindow from './ChatWindow'
import {updateCurrentRound, updateCurrentGame, updateCurrentMission, updateMissionParams} from '../../actions/currentGame'

// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

class Game extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const gameId = this.props.match.params.id  //we are getting room id via params until redux holds room id correctly
    let user_name = this.props.auth.user.user_name
    let localSocket = this.props.socket
    localSocket.emit('joinGame', gameId, user_name)
    localSocket.on('receiveUpdateGame', (gameData) => {
      const { dispatch } = this.props
      dispatch(updateCurrentGame(gameData.currentGame))
      // dispatch(updateCurrentMission(gameData.currentMission))
      // dispatch(updateCurrentRound(gameData.currentRound))      
      //dispatch(updateMissionParams(gameData.missionParams)) //can remove?
    })

  }


  render() {
    return (<div>
      <ChatWindow id={this.props.match.params.id} />
      <StatusBar />
      <Buttons />
      <GameBoard />
    </div>
    )
  }
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Game)
