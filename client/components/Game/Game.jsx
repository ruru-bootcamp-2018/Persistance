import React from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import Buttons from './Buttons'
import StatusBar from './StatusBar'
import ChatWindow from './ChatWindow'
import {updateCurrentRound, updateCurrentGame, updateCurrentMission, updateMissionParams} from '../../actions/currentGame'
import Votes from './Votes'
import Intentions from './Intentions'
import GameOver from './GameOver'
import IntentionsSuspense from './IntentionsSuspense'

// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: '',
      displayVotes: false,
      displayIntentions: false,
      mission: {}
    }
    this.sortIntentions = this.sortIntentions.bind(this)
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
    //if (this.state.stage == 'voting' && newProps.currentGame.gameStage !== 'voting') this.setState({showVotes: true})
    if (this.state.stage == 'intentions' && newProps.currentGame.gameStage !== 'intentions') this.sortIntentions(newProps.currentGame.missions)
    if (newProps.currentGame.gameStage == 'goodWin' || newProps.currentGame.gameStage == 'spyWin') this.setState({gameOver: true})
    this.setState({stage: newProps.currentGame.gameStage})
  }

  sortIntentions(missions){
    let mission = missions.slice().reverse().find(x => x.intentions.length > 0)
    let team = mission.intentions.map(member => {
      let player = this.props.currentGame.players.find(x => x.id == member.user_id)
      return player.display_name || player.user_name
    })    
    let intentions = mission.intentions.map(x => x.intention)
    if (Math.random() > 0.5) this.shuffleArray(intentions)
    else intentions.sort((a,b) => b-a)
    this.setState({showIntentions: true, mission: {intentions, team, outcome: mission.outcome}})
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  hideModal() {
    this.setState({showVotes: false, showIntentions: false, gameOver: false})
  }
  
  render() {

    return (<div>
      <StatusBar leader={(this.props.currentGame.currentRound.leader_id == this.props.auth.user.id)}/>
      <Buttons />
      <GameBoard />
      {this.state.showVotes && <Votes hideModal={this.hideModal.bind(this)}/>}
      {this.state.showIntentions && <IntentionsSuspense hideModal={this.hideModal.bind(this)}  mission={this.state.mission}/>}
      {this.state.gameOver && <GameOver hideModal={this.hideModal.bind(this)}/>}
      <ChatWindow id={this.props.match.params.id} />
    </div>
    )
  }
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Game)
