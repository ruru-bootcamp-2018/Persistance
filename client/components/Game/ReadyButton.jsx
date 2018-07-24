import React from 'react'
import { connect } from 'react-redux'
import {startGame} from '../../actions/playerInputs'

const ReadyButton = ({currentGame, socket}) => {
    return <button onClick={() => startGame(currentGame.game, socket)}style={{marginBottom: '0.5vw'}} className="button is-medium is-dark is-outlined">START GAME</button>
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(ReadyButton)
