import React from 'react'
import { connect } from 'react-redux'
import {sendIntention} from '../../actions/playerInputs'

class IntentionButtons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        hasCastIntention: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (this.state.hasCastIntention) return
    //do somthing
    const user = {id: this.props.auth.user.id} //needs to be from auth
    const intention = {user, game: this.props.currentGame.game, intention: (e.currentTarget.value == 'pass')}
    sendIntention(intention)
      .then(res => {
        const localSocket = this.props.socket
        const gameData = res.body
        const game_id = intention.game.id
        localSocket.emit('updateGameRoom', gameData, game_id)
        this.setState({hasCastIntention: true})

      })
}

render() {
    const player = this.props.currentGame.players.find(player => player.id == this.props.auth.user.id)
    const isSpy = player.role == 'spy' 
    return this.state.hasCastIntention ? (
    <div>
     <button className="no" disabled onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="pass"><img src="/success.png" className="intentionAccept raiseI"/></button>
     <button className="no" disabled onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="fail"><img src="/fail.png" className="intentionReject raiseI-red"/></button>
     </div>
   ) : (!isSpy) ? (
      <div>
     <button className="no" onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="pass"><img src="/success.png" className="intentionAccept raiseI"/></button>
     <button className="no" disabled onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="fail"><img src="/fail.png" className="intentionReject raiseI-red"/></button>
     </div>
   ) : (
     <div>
    <button className="no" onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="pass" ><img src="/success.png" className="intentionAccept raiseI"/></button>
    <button className="no" onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="fail"><img src="/fail.png" className="intentionReject raiseI-red"/></button>
    </div>
   )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(IntentionButtons)
