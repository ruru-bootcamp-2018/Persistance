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
                return <p className="has-text-weight-bold">{player.display_name || player.user_name}</p>
            })}
            <div className="level">
            <p className="is-size-5 has-text-weight-bold">{passes && passes}</p> {passes && <img className='tinyThumbLeft level-item' src='thumbs-up.png'></img>}
            <p className="is-size-5 has-text-weight-bold">{fails && fails}</p> {fails && <img className='tinyThumbRight level-item' src='thumbs-down.jpg'></img>}
            </div>
        </div>
    )
}

export default MissionToolTip

