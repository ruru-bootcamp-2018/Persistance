import React from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import ReadyButton from './ReadyButton'
import StatusBar from './StatusBar'

// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

const Game = props => {

  return (
    <div>
      <StatusBar />
      <ReadyButton />
      <GameBoard />
    </div>
  )
}


const mapStateToProps = (state) => ({
})


export default connect(mapStateToProps)(Game)