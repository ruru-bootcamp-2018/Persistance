import React from 'react'
import { connect } from 'react-redux'
import EmptyPlayer from './EmptyPlayer'
import DataButtonW from './DataButtonW'
import ReadyButton from './ReadyButton'

// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

class Waiting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.checkStarted = this.checkStarted.bind(this)
  }

  checkStarted(){
    if (this.props.currentGame.game.in_progress){
      this.props.history.push(`/game/${this.props.match.params.id}`)
    }
  }

  render() {
    const { players } = this.props.currentGame
  return (
    <div>
      {this.checkStarted()}
      <div className='is-size-3 statusBar' >
        <p>Waiting for Players</p>   
      </div>
      {(this.props.currentGame.game.host_id == 1) && <ReadyButton />}
      <DataButtonW />
      <div className="level">
        {players.map((player, i) => {
          return <EmptyPlayer key={i} player={player} />
        })}
      </div> 

    </div>
  )
}

}


const mapStateToProps = (state) => state


export default connect(mapStateToProps)(Waiting)