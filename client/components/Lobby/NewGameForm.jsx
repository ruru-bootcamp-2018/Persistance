import React from 'react'
import {connect} from 'react-redux'


class NewGameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerNumber: 5, 
      gameName : ""
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }


  updateDetails(e) {
   this.setState({[e.target.name] : e.target.value})
  }  


  submit(e) {
    e.preventDefault()
    let id = 9
    document.location = `/#/game/${id}`
  }

  render() {
    return (
      <div>
        <form className="Login container" onSubmit={this.submit}>
          <label>Game Name:
          <input className="input" type="text" name="gameName" onChange={this.updateDetails} />
          </label><br />
          <label>Player Amount:
            <select className="input" onChange={this.updateDetails} name="playerNumber">
              {Array(6).fill(0).map((e, i) => <option value={i + 5}>{i + 5}</option>)}
            </select>
          </label>
          <input className="input" type="submit"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => state 


export default connect(mapStateToProps)(NewGameForm)