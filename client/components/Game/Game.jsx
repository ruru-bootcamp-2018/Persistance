import React from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import Buttons from './Buttons'
import StatusBar from './StatusBar'
import ChatWindow from './ChatWindow'
import { updateCurrentRound, updateCurrentGame, updateCurrentMission, updateMissionParams } from '../../actions/currentGame'
import Votes from './Votes'
import Intentions from './Intentions'
import GameOver from './GameOver'
import IntentionsSuspense from './IntentionsSuspense'
import HistoryIcon from './HistoryIcon'
import {getGameState} from '../../actions/currentGame'

// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: '',
      showVotes: false,
      showIntentions: false,
      gameOver: false,
      mission: {},
      round: {}
    }
    this.timeout = null
    this.sortIntentions = this.sortIntentions.bind(this)
    this.grabVotes = this.grabVotes.bind(this)
  }

  componentDidMount() {
    const gameId = this.props.match.params.id  //we are getting room id via params until redux holds room id correctly
    let user_name = this.props.auth.user.user_name
    let localSocket = this.props.socket
    localSocket.emit('joinGame', gameId, user_name)
    localSocket.on('receiveUpdateGame', (gameData) => {
      const { dispatch } = this.props
      clearTimeout(this.timeout)
      dispatch(updateCurrentGame(gameData.currentGame))
      this.timeout = setTimeout(() => {
        this.getData()
      },60000)     
    })
    this.getData()
  }


  componentWillReceiveProps(newProps){
    if (this.state.stage == 'voting' && newProps.currentGame.gameStage !== 'voting') this.grabVotes(newProps.currentGame.missions)
    if (this.state.stage == 'intentions' && newProps.currentGame.gameStage !== 'intentions') this.sortIntentions(newProps.currentGame.missions)
    if (newProps.currentGame.gameStage == 'goodWin' || newProps.currentGame.gameStage == 'spyWin') this.setState({ gameOver: true })
    this.setState({ stage: newProps.currentGame.gameStage })
  }

  getData(){
    const gameId = this.props.match.params.id
    clearTimeout(this.timeout)
    props.dispatch(getGameState(gameId)).then(() => {
      console.log('data update on timeout')
      this.timeout = setTimeout(() => {
        this.getData()
      },60000)
    })    
  }


  grabVotes(missions){
    let mission = missions[missions.length -1]
    let round = mission.rounds.slice().reverse().find(x => x.votes.length > 0)
    this.setState({showVotes: true, round: round})
  }

  sortIntentions(missions){
    let mission = missions.slice().reverse().find(x => x.intentions.length > 0)
    let team = mission.intentions.map(member => {
      let player = this.props.currentGame.players.find(x => x.id == member.user_id)
      return player
    })


    let intentions = mission.intentions.map(x => x.intention)
    if (Math.random() > 0.5) this.shuffleArray(intentions)
    else intentions.sort((a, b) => b - a)
    this.setState({ showIntentions: true, mission: { intentions, team, outcome: mission.outcome } })
  }


  shuffleArray(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

  hideModal() {
    this.setState({ showVotes: false, showIntentions: false})
  }

  hideGameOver() {
    this.setState({ gameOver: false })
  }


  render() {
    return (
      <div className="container">
          <StatusBar leader={(this.props.currentGame.currentRound.leader_id == this.props.auth.user.id)} />
            <Buttons />
            <GameBoard />
            {this.state.showVotes && <Votes hideModal={this.hideModal.bind(this)} round={this.state.round} />}
            {this.state.gameOver && <GameOver hideModal={this.hideGameOver.bind(this)} />}
            {this.state.showIntentions && <IntentionsSuspense hideModal={this.hideModal.bind(this)} mission={this.state.mission} />}            
            <div style={{marginTop: '1vw'}} className="ChatContainer">
            <ChatWindow id={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Game)
