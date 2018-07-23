import React from 'react'
import { connect } from 'react-redux'
import EmptyPlayer from './EmptyPlayer'
import DataButtonW from './DataButtonW'
import ReadyButton from './ReadyButton'
import ChatWindow from './ChatWindow'
import {updateCurrentRound, updateCurrentGame, updateCurrentMission, updateMissionParams} from '../../actions/currentGame'


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

  componentDidMount() {
    const gameId = this.props.match.params.id  //we are getting room id via params until redux holds room id correctly
    let user_name = this.props.auth.user.user_name
    let localSocket = this.props.socket
    localSocket.emit('joinGame', gameId, user_name)
    localSocket.on('receiveUpdateWaiting', (gameData) => {
      const {dispatch} = this.props
      dispatch(updateCurrentRound(gameData.currentRound))
      dispatch(updateCurrentMission(gameData.currentMission))
      dispatch(updateMissionParams(gameData.missionParams))
      dispatch(updateCurrentGame(gameData.currentGame))
    })
  }

  render() {
    const { players } = this.props.currentGame
    const {host_id} = this.props.currentGame.game
    const gameId = this.props.match.params.id

    return (
      <div>
        <ChatWindow id={gameId} />
        {this.checkStarted()}
        <div className='is-size-3 statusBar' >
          <p>Waiting for Players</p>
        </div>
        {(host_id == 1) && <ReadyButton />}
        <DataButtonW />
        <div className="level">
          {players.map((player, i) => {
            return <EmptyPlayer key={i} player={player} />
          })}
        </div>

      </div>

      {(this.props.currentGame.game.host_id == this.props.auth.user.id) && <ReadyButton />}
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