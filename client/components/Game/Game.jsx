import React from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import Buttons from './Buttons'
import StatusBar from './StatusBar'


// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

const Game = props => {

  return (
    <div>
      <StatusBar />
      <Buttons />
      <GameBoard />
    </div>
  )
}


const mapStateToProps = (state) => ({
})


export default connect(mapStateToProps)(Game)