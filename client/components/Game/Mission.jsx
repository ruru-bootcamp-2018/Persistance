import React from 'react'
import { connect } from 'react-redux'
import RoundCounter from './RoundCounter'
import MissionToolTip from './MissionToolTip'
import {Tooltip} from 'react-tippy'

const Mission = props => {
  const { id, outcome } = props.mission
  return (
    <Tooltip
      // options
      position="bottom"
      trigger="mouseenter"
      html={(
        <MissionToolTip mission={props.mission} players={props.currentGame.players} />
      )}
    >
      <h2 className="level-item has-text-centered is-size-2 mission">{props.number + 1}</h2>
      <br />
      {outcome == null? "not played" : outcome ? <p>goodies win</p> : <p>baddies win</p>}
    </Tooltip>
  )
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Mission)