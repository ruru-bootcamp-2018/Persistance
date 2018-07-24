import React from 'react'
import { connect } from 'react-redux'
import { confirmNominations } from '../../actions/playerInputs'

class ConfirmNom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        hasFinishedNomming: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {

    const confirm = (e.currentTarget.value == 'true')
    const reject = (e.currentTarget.value == 'false')

    if (confirm) {
        confirmNominations(this.props.currentGame)
        .then(res => {
          const localSocket = this.props.socket
          const gameData = res.body
          const game_id = this.props.currentGame.game.id
  
          localSocket.emit('updateGameRoom', gameData, game_id)
    
          this.setState({hasFinishedNomming: true})
        }) 
    }
  }

  render() {

    return this.state.hasFinishedNomming ? (
        <div>
        <button disabled onClick={(e) => this.handleClick(e)} value="true" style={{marginBottom: '0.5vw'}} className="button raise is-success is-large is-outlined"><i className="fas fa-check"></i></button>
        </div>
      ) : (
        <div>
        <button onClick={(e) => this.handleClick(e)} value="true" style={{marginBottom: '0.5vw'}} className="button raise-green is-success is-large is-outlined"><i className="fas fa-check"></i></button>
        </div>
      )
    }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(ConfirmNom)