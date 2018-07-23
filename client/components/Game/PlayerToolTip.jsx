import React from 'react'
import { connect } from 'react-redux'

      /* Tooltip needs to display information about players,
            but when leader is nominating, it MUST show that a click will nominate
            irreversably. 
        */

const PlayerToolTip = props => {
        const {id, display_name, user_name} = props.player
        return (<div className="playerToolTip">
            <p> User: {user_name} </p>
            <p> ID: {id} </p>
            {display_name && <p> DisplayName: {display_name}</p>}
        </div>)
}

export default PlayerToolTip

