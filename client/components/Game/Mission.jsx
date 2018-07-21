import React from 'react'
import { connect } from 'react-redux'
import RoundCounter from './RoundCounter';

class Mission extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {mission_number, outcome} = this.props.mission
    if (mission_number == 3 ) {
       console.log( this.props.mission)
    }
    return (
      <div>
        <h2 className="level-item has-text-centered is-size-2 mission">
          {mission_number}
          <br />
          {outcome && outcome}
          
        </h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => state


export default connect(mapStateToProps)(Mission)