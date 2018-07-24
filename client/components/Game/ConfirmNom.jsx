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
        console.log(this.props.currentGame.game.id);
        
        confirmNominations(this.props.currentGame)
        .then(res => {
          const localSocket = this.props.socket
          const gameData = res.body
          const game_id = this.props.currentGame.game.id
  
          localSocket.emit('updateGameRoom', gameData, game_id)
    
          this.setState({hasFinishedNomming: true})
        }) 
    }else {
        console.log('nah')
        this.setState({hasFinishedNomming: true})
    }
  }

  render() {

    return this.state.hasFinishedNomming ? (
        <div>
        <button disabled onClick={(e) => this.handleClick(e)} value="true" style={{marginBottom: '0.5vw'}} className="button is-success is-large is-outlined"><i className="fas fa-check"></i></button>
        <button disabled onClick={(e) => this.handleClick(e)} value="false" style={{marginBottom: '0.5vw'}} className="button is-danger is-large is-outlined"><i className="fas fa-times"></i></button>
        </div>
      ) : (
        <div>
        <button onClick={(e) => this.handleClick(e)} value="true" style={{marginBottom: '0.5vw'}} className="button is-success is-large is-outlined"><i className="fas fa-check"></i></button>
        <button onClick={(e) => this.handleClick(e)} value="false" style={{marginBottom: '0.5vw'}} className="button is-danger is-large is-outlined"><i className="fas fa-times"></i></button>
        </div>
      )
    }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(ConfirmNom)