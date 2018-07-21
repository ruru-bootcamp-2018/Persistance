import React from 'react'
import { connect } from 'react-redux'
import {
    Tooltip,
} from 'react-tippy';

import Template from './Template'
import PlayerToolTip from './PlayerToolTip'

const roundStyleObj = {
    borderRadius: "50%",
    height: "100px",
    width: "100px"
}

class Player extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {

    }

    handleClick() {
        alert("This should do nothing unless nomming. If nomming, should nom this player")
    }

    render() {
        //console.log(this.props.player)
        const { display_name, user_name, img } = this.props.player
        return (
            <Tooltip
                // options
                title="Welcome to React"
                position="bottom"
                trigger="mouseenter"
                html={(
                    <PlayerToolTip player={this.props.player}/>
                )}
            >
                
                <div style={{ border: "1px solid black" }} onClick={this.handleClick} className="player" >
                <p> {display_name || user_name} </p>
                <img className="disgonberound" style={roundStyleObj} src={img} />
            </div>
        

            </Tooltip>
        )

    }

}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Player)

