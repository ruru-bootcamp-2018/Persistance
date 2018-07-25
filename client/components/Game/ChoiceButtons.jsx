import React from 'react'
import { connect } from 'react-redux'
import {sendVote} from '../../actions/playerInputs'

class ChoiceButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        hasVoted: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const user = {id: this.props.auth.user.id} //needs to be from auth
    const vote = {user, game: this.props.currentGame.game, vote: (e.currentTarget.value == 'true')}

    sendVote(vote)
      .then(res => {
        const localSocket = this.props.socket
        const gameData = res.body
        const game_id = vote.game.id

        localSocket.emit('updateGameRoom', gameData, game_id)
        this.setState({hasVoted: true})
      })
  }

  render() {

    return this.state.hasVoted ? (
      <div>
      <button disabled onClick={(e) => this.handleClick(e)} value="true" style={{marginBottom: '0.5vw'}} className="no"><img src="/Approve.png" className="voteCheck nono"/></button>
      <button disabled onClick={(e) => this.handleClick(e)} value="false" style={{marginBottom: '0.5vw'}} className="no"><img src="/Reject.png" className="voteCross nono"/></button>
      </div>
    ) : (
      <div>
      <button onClick={(e) => this.handleClick(e)} value="true" style={{marginBottom: '0.5vw'}} className="no"><img src="/Approve.png" className="voteCheck raise-white"/></button>
      <button onClick={(e) => this.handleClick(e)} value="false" style={{marginBottom: '0.5vw'}} className="no"><img src="/Reject.png" className="voteCross raise-black"/></button>
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(ChoiceButton)
