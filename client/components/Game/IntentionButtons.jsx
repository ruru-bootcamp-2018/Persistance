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
    return this.state.hasCastIntention ? (
    <div>
     <button disabled onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="pass" className="button is-success is-large is-outlined"><i className="fas fa-check"></i></button>
     <button disabled onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="fail" className="button is-danger is-large is-outlined"><i className="fas fa-times"></i></button>
     </div>
    ) : (
      <div>
     <button onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="pass" className="button is-success is-large is-outlined"><i className="fas fa-check"></i></button>
     <button onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="fail" className="button is-danger is-large is-outlined"><i className="fas fa-times"></i></button>
     </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(IntentionButtons)
