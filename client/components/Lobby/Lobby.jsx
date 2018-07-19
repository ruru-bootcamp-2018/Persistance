import React from 'react'
import {connect} from 'react-redux'
import NewGameForm from './NewGameForm'

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>I am a lobby</h1>
        <NewGameForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Lobby)