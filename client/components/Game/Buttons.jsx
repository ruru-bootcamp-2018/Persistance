import React from 'react'
import { connect } from 'react-redux'
import ReadyButton from './ReadyButton'
import ChoiceButtons from './ChoiceButtons'

const Buttons = props => {
const isLeader = (props.currentRound.leader_id == props.auth.user_id) //need to verify
const { gameStage } = props.currentGame
const {round_num} = props.currentRound
const {mission_num} = props.currentMission
const noms = props.currentGame.missions[mission_num -1].rounds[round_num -1].nominations
const onTeam = noms.reduce((acc, nom) => {
  if (nom.user_id == props.auth.user_id) return true 
  else return acc
}, false)

  return (
    <div>
       {(gameStage == 'voting') && <ChoiceButtons />}
       {(onTeam && gameStage == 'intentions') && <IntentionButtons />}
       {(isLeader && gameStage == 'waiting') && <ReadyButton />}
    </div>
  )
}

const mapStateToProps = (state) => state


export default connect(mapStateToProps)(Buttons)