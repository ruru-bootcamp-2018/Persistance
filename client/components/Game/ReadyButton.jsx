import React from 'react'
import { connect } from 'react-redux'

const ReadyButton = props => {    
    return <button style={{marginBottom: '0.5vw'}} className="button is-medium is-dark is-outlined">START GAME</button>
}

const mapStateToProps = (({dispatch}) => {
    return {dispatch}
} )

export default connect(mapStateToProps)(ReadyButton)
