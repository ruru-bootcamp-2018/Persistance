import React from 'react'
import { connect } from 'react-redux'

const StatusBar = props =>  {

    const { gameStage } = props.currentGame
    let displayText = ""

    //depends on who you are what you see

    switch(gameStage) {
        case "voting":
        displayText = "It's time to vote on the nominated team"
        break
        case "nominating":
        displayText = "Team is being nominated"
        break
        case "intentions":
        displayText = "Intentions are being case for the mission"
        break
        default:
        displayText = "404 this is not the page you were looking for - game stage not correctly defined"
    }

    return (
    <div className='is-size-3 statusBar' >
        <p>{displayText}</p>
    </div>
  )
}

const mapStateToProps = ({ currentGame }) => ({ currentGame })

export default connect(mapStateToProps)(StatusBar)
