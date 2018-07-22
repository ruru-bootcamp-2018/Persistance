import React from 'react'
import { connect } from 'react-redux'
import MissionToolTip from './MissionToolTip'
import {Tooltip} from 'react-tippy'


const Mission = props => {
  const textStyle = 'is-uppercase is-size-5'
  const { id, outcome } = props.mission
  const glow = (props.currentMission.mission_num == props.number + 1) ? 'cake' : ''
  const missionNumber = props.number
  return (
    <Tooltip
      // options
      position="bottom"
      trigger="mouseenter"
      html={(
        <MissionToolTip mission={props.mission} players={props.currentGame.players} />
      )}
    >

      <h2 className={`level-item circles has-text-centered has-text-black is-size-2 mission ${glow}`}>{props.missionParams[props.number].team_total}</h2>
      <br />

      {outcome == null ? <p className="hidden">Nothing yet</p> : outcome ? <p className={`has-text-info ${textStyle}`}>Goodies win</p> : <p className={`has-text-danger ${textStyle}`}>Baddies win</p>}



    </Tooltip>
  )
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Mission)
