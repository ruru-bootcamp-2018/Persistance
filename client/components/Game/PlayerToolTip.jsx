import React from 'react'
import { connect } from 'react-redux'

class PlayerToolTip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render(){
        const { display_name, user_name} = this.props.player
        return (<div className="playerToolTip">
            <p> User: {user_name} </p>
            {display_name && <p> DisplayName: {display_name}</p>}
        </div>)
    }

}

const mapStateToProps = (state) => state

export default PlayerToolTip

