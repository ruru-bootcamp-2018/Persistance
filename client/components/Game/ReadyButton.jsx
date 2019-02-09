import React from 'react'
import { connect } from 'react-redux'
import {startGame} from '../../actions/playerInputs'

class ReadyButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
        this.startGame = this.startGame.bind(this)
    }
    startGame() {
        const {currentGame, socket} = this.props
        if (this.state.isLoading) return
        this.setState({isLoading: true})

        startGame(currentGame.game)
            .then((res) => {
                const gameData = res.body
                const game_id = currentGame.game.id
                socket.emit('updateWaitingRoom', gameData, game_id)
                this.setState({isLoading: false})
            })
    }
    render() {
        return <button onClick={this.startGame} style={{marginBottom: '0.5vw'}} className={`button is-medium is-white is-outlined ${this.state.isLoading ? 'is-loading' : ''}`}>START GAME</button>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(ReadyButton)
