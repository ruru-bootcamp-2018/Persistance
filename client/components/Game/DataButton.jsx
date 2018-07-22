import React from 'react'
import {getGameState} from '../../actions/currentGame'
import { connect } from 'react-redux'

const DataButton = props => {    
    return <button onClick={() => props.dispatch(getGameState())} style={{marginBottom: '0.5vw'}} className="button is-medium is-dark is-outlined">Get Data</button>
}

const mapStateToProps = (({dispatch}) => {
    return {dispatch}
} )

export default connect(mapStateToProps)(DataButton)
