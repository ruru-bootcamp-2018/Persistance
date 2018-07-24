import React from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import Buttons from './Buttons'
import StatusBar from './StatusBar'
import ChatWindow from './ChatWindow'
import {updateCurrentRound, updateCurrentGame, updateCurrentMission, updateMissionParams} from '../../actions/currentGame'
import Votes from './Votes'
import Intentions from './Intentions'

// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: '',
      displayVotes: false,
      displayIntentions: false
    }
    this.showVotes = this.showVotes.bind(this)
    this.showIntentions = this.showIntentions.bind(this)
  }

  componentDidMount() {
    const gameId = this.props.match.params.id  //we are getting room id via params until redux holds room id correctly
    let user_name = this.props.auth.user.user_name
    let localSocket = this.props.socket
    localSocket.emit('joinGame', gameId, user_name)
    localSocket.on('receiveUpdateGame', (gameData) => {
      const { dispatch } = this.props
      dispatch(updateCurrentGame(gameData.currentGame))
      // dispatch(updateCurrentMission(gameData.currentMission))
      // dispatch(updateCurrentRound(gameData.currentRound))
      //dispatch(updateMissionParams(gameData.missionParams)) //can remove?
    })

  }

  componentWillReceiveProps(newProps){
    if (this.state.stage == 'voting' && newProps.currentGame.gameStage !== 'voting') this.showVotes()
    if (this.state.stage == 'intentions' && newProps.currentGame.gameStage !== 'intentions') this.showIntentions()
    this.setState({stage: newProps.currentGame.gameStage})
  }

  hideVotes() {
    this.setState({showVotes: false})
  }


  showVotes(){
    this.setState({showVotes: true})
    // setTimeout(() => {
    //   this.setState({showVotes: false})
    // }, 5000)
  }

  hideIntentions() {
    this.setState({showIntentions: false})
  }


  showIntentions(){
    this.setState({showIntentions: true})
    // setTimeout(() => {
    //   this.setState({showVotes: false})
    // }, 5000)
  }

  render() {

    return (<div>
      <StatusBar leader={(this.props.currentGame.currentRound.leader_id == this.props.auth.user.id)}/>
      <Buttons />
      <GameBoard />
      {this.state.showVotes && <Votes hideVotes={this.hideVotes.bind(this)}/>}
      {this.state.showIntentions && <Intentions hideIntentions={this.hideIntentions.bind(this)}/>}
      <ChatWindow id={this.props.match.params.id} />
    </div>
    )
  }
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Game)
