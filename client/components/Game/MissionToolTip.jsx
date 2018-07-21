import React from 'react'

const MissionToolTip = props => {
    let missionTeam, intentions, passes, fails
    if (props.mission.outcome == !null) {
        let rounds = props.mission.rounds
        missionTeam = rounds[rounds.length - 1].nominations
        intentions = props.mission.intentions
        passes = intentions.reduce((acc, x) => {
            if (x.intention) acc++
            return acc
        }, 0)
        fails = intentions.length - passes
    }


    return (
        <div>
            {missionTeam && missionTeam.map(member => {
                let player = props.players.find(x => x.id == member.user_id)
                return <p>{player.display_name || player.user_name}</p>
            })}
        <p>{passes && `${passes} pass ${fails} fails`}</p>    
        </div>
    )
}

export default MissionToolTip

