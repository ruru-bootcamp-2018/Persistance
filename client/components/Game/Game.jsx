import React from 'react'
import {connect} from 'react-redux'
import GameBoard from './GameBoard'
import WaitingRoom from '../WaitingRoom/WaitingRoom'

// this is the head component for both game and waitingRoom- it decides what to render- based
// on game start, game won etc!!! 

class Game extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
         players: [1,2,3,4,5],
         ready: false
      }
      this.startGame = this.startGame.bind(this)
    }
    
    startGame() {
        
    }

    endGame() {
        
    }

    render() {
        return (
            <div>
                {this.state.ready && <GameBoard />}
            </div>
        )
    }
}

const mapStateToProps = ({ playerNumber }) => ({playerNumber : 5 })


export default connect(mapStateToProps)(Game)