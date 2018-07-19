import React from 'react'
import {connect} from 'react-redux'

class Game extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }
  
    render() {
      return (
        <div>
            <h1>I am in the game now</h1>
        </div>
      )
    }
  }
  
  const mapStateToProps = (state) => state
  
  
  export default connect(mapStateToProps)(Game)