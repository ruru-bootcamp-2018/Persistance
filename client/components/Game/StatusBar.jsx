import React from 'react'
import { connect } from 'react-redux'

const StatusBar = props =>  {

    const { gameStage } = props.currentGame
    let displayText = ""

    //depends on who you are what you see

    switch(gameStage) {
        case "voting":
        displayText = "Do you approve of this mission?"
        break
        case "nominating":
        displayText = "Nominate your team"
        break
        case "intentions":
        displayText = "Cast your intention"
        break
        default:
        displayText = "No game stage!!"
    }

    return (
    <div className='is-size-3 statusBar' >
        <p>{displayText}</p>   
    </div>
  )
}

const mapStateToProps = ({ currentGame }) => ({ currentGame })

export default connect(mapStateToProps)(StatusBar)
