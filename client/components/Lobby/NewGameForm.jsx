import React from 'react'
import request from '../../utils/api'

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
    request('post', './game/new', {game_name: this.state.gameName, user: {id: 1}}).then((res) => {
     let id = res.body.id 
     document.location = `/#/game/${id}`
    })
    
  }

  render() {
    return (
      <div className="columns">
        <form className="column is-5 Login container" onSubmit={this.submit}>
          <label className="is-size-4">Start A New Game:
          <input style={{margin: '1vw'}} className="input is-rounded" type="text" name="gameName" onChange={this.updateDetails} />
          </label>
          <br />
          <input style={{margin: '1vw'}} className="button is-medium is-link is-outlined" type="submit" />
        </form>
      </div>
    )
  }
}


export default NewGameForm
