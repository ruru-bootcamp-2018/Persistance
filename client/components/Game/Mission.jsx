import React from 'react'
import { connect } from 'react-redux'
import MissionToolTip from './MissionToolTip'
import {Tooltip} from 'react-tippy'


const Mission = props => {
  const { id, outcome } = props.mission
  const glow = (props.currentMission.mission_num == props.number + 1) ? 'cake' : ''
  return (
    <Tooltip
      // options
      position="bottom"
      trigger="mouseenter"
      html={(
        <MissionToolTip mission={props.mission} players={props.currentGame.players} />
      )}
    >
    
      <h2 className={`level-item has-text-centered is-size-2 mission ${glow}`}>{props.missionParams[props.number].team_total}</h2>
      <br />

      {outcome == null? "" : outcome ? <p className="is-size-5">Goodies win</p> : <p className="is-size-5">Baddies win</p>}

     

    </Tooltip>
  )
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Mission)
