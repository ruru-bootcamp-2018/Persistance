import React from 'react'
import { connect } from 'react-redux'

class RoundCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render(){
        const fakeround = { round_num:1 , mission_id:2 , leader_id:4 }
        return (
            <div>
            <h4 className="level-item has-text-centered is-size-5 mission">
                Round Counter:
            </h4>

            </div>


        )
    }

}

const mapStateToProps = (state) => state

export default RoundCounter
