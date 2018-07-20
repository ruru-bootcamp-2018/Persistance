import React from 'react'
import {connect} from 'react-redux'

class StatusBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className='is-size-3 statusBar' > 
            <p>{this.props.displayMessage}</p>
            <p> waiting </p>       
        
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        displayMessage: "I am the status bar"
    }
} 

export default connect(mapStateToProps)(StatusBar)