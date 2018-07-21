import React from 'react'
import { connect } from 'react-redux'
import {Tooltip} from 'react-tippy'
import Template from './Template'
import PlayerToolTip from './PlayerToolTip'

const roundStyleObj = {
  borderRadius: "50%",
  height: "120px",
  width: "120px"
}

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleClick() {
    alert("This should do nothing unless nomming. If nomming, should nom this player")
  }

  render() {
    const { display_name, user_name, img } = this.props.player
    return (
      <Tooltip
        // options
        position="bottom"
        trigger="mouseenter"
        html={(
          <PlayerToolTip player={this.props.player} />
        )}
      >
        <div onClick={this.handleClick.bind(this)} className="player" >
          <p> {display_name || user_name} </p>
          <img style={roundStyleObj} src={img} />
        </div>
      </Tooltip>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Player)

