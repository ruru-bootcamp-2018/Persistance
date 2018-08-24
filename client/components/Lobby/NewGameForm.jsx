import React from 'react'
import request from '../../utils/api'
import {connect} from 'react-redux'

class NewGameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameName: ""
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateDetails(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // remove [0] on merge
  submit(e) {
    e.preventDefault()
    document.forms['newGame'].reset()
    if (this.state.gameName) {                                            ///////////////////////////
    request('post', 'game/new', {game_name: this.state.gameName, user: {id: this.props.auth.user.id}})
      .then((res) => {
        let id = res.body.id                                                 /////////////////////////////
        const localSocket = this.props.socket
        localSocket.emit('createGame', id)
        localSocket.emit('getGames', () => {
          console.log('give me games')
        })
        //document.location = `/#/waiting/${id}`
      })

  }
  }

  render() {
    return (
      <div className="columns">
        <form className="column is-5 Login container" name="newGame">
          <label className="is-size-4 has-text-white">Start A New Game:
          <input style={{margin: '1vw'}} className="input is-rounded" type="text" name="gameName" onChange={this.updateDetails} />
          </label>
          <br />
          <button style={{margin: '1vw'}} className="button is-medium is-white is-outlined raise" onClick={this.submit}>submit</button>
        </form>
      </div>
    )
  }
}

const mapCateToProps = (state) => state

export default connect(mapCateToProps)(NewGameForm)
