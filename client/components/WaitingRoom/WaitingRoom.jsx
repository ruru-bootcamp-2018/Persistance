import React from 'react'
import {connect} from 'react-redux'
import ReadyButton from './ReadyButton'


class WaitingRoom extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
         players: [1,2,3,4,5],
         ready: false
      }
    }
    

    render() {
        const {playerNumber} = this.props
        return (
            <div>
                <h2>Waiting!!</h2>
                {this.state.players.length === playerNumber && <ReadyButton/>}
            </div>
        )
    }
}

const mapStateToProps = ({ playerNumber }) => ({playerNumber : 5 })


export default connect(mapStateToProps)(WaitingRoom)