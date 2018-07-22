import React from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import ReadyButton from './ReadyButton'
import StatusBar from './StatusBar'
import ChatWindow from'./ChatWindow'
// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

const Game = props => {
  const gameId = props.match.params.id  //we are getting room id via params until redux holds room id correctly
  let user_name = props.auth.user.user_name
  let localSocket = props.socket
  localSocket.emit('joinGame', gameId, user_name)
  return (
    <div>
      <ChatWindow id={gameId}/> 
      <StatusBar />
      <ReadyButton />
      <GameBoard />
    </div>
  )
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Game)