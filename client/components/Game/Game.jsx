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

// ReadyButton appears to leader, when socket is occupied by > 5 and < 10

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: '',
      displayVotes: false,
      displayIntentions: false
    }
    
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
    if (this.state.stage == 'intentions' && newProps.currentGame.gameStage !== 'intentions') this.setState({showIntentions: true})
    if (newProps.currentGame.gameStage == 'goodWin' || newProps.currentGame.gameStage == 'spyWin') this.setState({gameOver: true})
    this.setState({stage: newProps.currentGame.gameStage})
  }

  hideModal() {
    this.setState({showVotes: false, showIntentions: false, gameOver: false})
  }
  
  render() {

    return (<div>
      <ChatWindow id={this.props.match.params.id} />
      <StatusBar leader={(this.props.currentGame.currentRound.leader_id == this.props.auth.user.id)}/>
      <Buttons />
      <GameBoard />
      {this.state.showVotes && <Votes hideModal={this.hideModal.bind(this)}/>}
      {this.state.showIntentions && <Intentions hideModal={this.hideModal.bind(this)}/>}
      {this.state.gameOver && <GameOver hideModal={this.hideModal.bind(this)}/>}
    </div>
    )
  }
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Game)
