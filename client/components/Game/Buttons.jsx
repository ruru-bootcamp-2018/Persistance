import React from 'react'
import { connect } from 'react-redux'

import ChoiceButtons from './ChoiceButtons'
import IntentionButtons from './IntentionButtons'

const Buttons = props => {
const isLeader = (props.currentRound.leader_id == 1) //1 needs to be auth id
const { gameStage } = props.currentGame
const {round_num} = props.currentRound
const {mission_num} = props.currentMission
const noms = props.currentGame.missions[mission_num -1].rounds[round_num -1].nominations
const onTeam = noms.reduce((acc, nom) => {
  if (nom.user_id == 1) return true  //1 needs to be auth id
  else return acc
}, false)

  return (
    <div>
       {(gameStage == 'voting') && <ChoiceButtons />}
       {(onTeam && gameStage == 'intentions') && <IntentionButtons />}       
    </div>
  )
}

const mapStateToProps = (state) => state


export default connect(mapStateToProps)(Buttons)