import React from 'react'
import { connect } from 'react-redux'
import {Tooltip} from 'react-tippy'
import PlayerToolTip from './PlayerToolTip'

const roundStyleObj = {
  borderRadius: "50%",
  height: "120px",
  width: "120px"
}

class EmptyPlayer extends React.Component {
  constructor(props) {
    super(props)
  }

    render() {


        const { display_name, user_name, img } = this.props.player

        return (
            <Tooltip
                // options
                position="bottom"
                trigger="mouseenter"
                html={(
                    <PlayerToolTip player={this.props.player}/>
                )}
            >

                <div className="player" >
                <p className="has-text-white is-size-5"> {display_name || user_name} </p>
                <img style={roundStyleObj} src={img} />
            </div>


            </Tooltip>
        )

    }

}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(EmptyPlayer)
