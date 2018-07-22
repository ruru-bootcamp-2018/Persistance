import React from 'react'
import { connect } from 'react-redux'
import {startGame} from '../../actions/playerInputs'

const ReadyButton = props => {    
    return <button onClick={() => startGame({game: props.currentGame.game})}style={{marginBottom: '0.5vw'}} className="button is-medium is-dark is-outlined">START GAME</button>
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(ReadyButton)
