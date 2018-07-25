import React from 'react'
import { connect } from 'react-redux'

const StatusBar = props =>  {
    const { round_num } = props.currentGame.currentRound
    const { mission_num } = props.currentGame.currentMission
    const noms = props.currentGame.missions[mission_num - 1].rounds[round_num - 1].nominations
    const reqNoms = props.missionParams[mission_num -1].team_total
    const allNoms = reqNoms == noms.length
    const authID = props.auth.user.id
    const onTeam = noms.find(player => player.user_id == authID)
    const { gameStage } = props.currentGame
    let displayText = ""
    //depends on who you are what you see

    switch(gameStage) {
        case "voting":
        displayText = "It's time to vote on the nominated team"
        break
        case "nominating":
            switch(props.leader){
                case true:
                    switch(allNoms){ //need to check whether
                        case true:
                        displayText = "Confirm this team?"
                        break
                        case false:
                        displayText =  "Please Nominate the Team"
                        break
                    }
                break
                case false:
                displayText = "Team is being nominated"
                break
            }
        break
        case "intentions":
          switch(onTeam ? true : false){
            case true:
            displayText = "Choose your intention for this mission"
            break
            case false:
            displayText = "Intentions are being cast for the mission"
            break
          }
        break
        case "goodWin":
        displayText = "The loyalists have persited in their attempts"
        break
        case "spyWin":
        displayText = "The spies have succeded in throwing the missions"
        break
        default:
        displayText = "404 this is not the page you were looking for - game stage not correctly defined"
    }

    return (
    <div className='is-size-3 statusBar has-text-white' >
        <p>{displayText}</p> 
        <HistoryIcon />
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(StatusBar)
