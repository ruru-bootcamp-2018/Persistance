import React from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import Buttons from './Buttons'
import StatusBar from './StatusBar'
import ChatWindow from'./ChatWindow'

// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

const Game = props => {
  return (
    <div>
      <ChatWindow id={props.match.params.id}/>
      <StatusBar />
      <Buttons />
      <GameBoard />
    </div>
  )
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Game)
