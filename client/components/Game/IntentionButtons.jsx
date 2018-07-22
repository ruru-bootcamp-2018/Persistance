import React from 'react'
import { connect } from 'react-redux'

const IntentionButtons = props => {    
    return (
    <div>
     <button style={{marginBottom: '0.5vw'}} className="button is-medium is-dark is-outlined"><i className="fas fa-check"></i></button>
     <button style={{marginBottom: '0.5vw'}} className="button is-medium is-dark is-outlined"><i className="fas fa-times"></i></button>
     </div>
    )
}

const mapStateToProps = (({dispatch}) => {
    return {dispatch}
} )

export default connect(mapStateToProps)(IntentionButtons)