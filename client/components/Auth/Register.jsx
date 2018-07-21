import React from 'react'
import {connect} from 'react-redux'
import {registerUserRequest} from '../../actions/register'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      password: '',
      confirm_password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }
  updateDetails(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  submit(e) {
    e.preventDefault()
    e.target.reset()
    let {user_name, password, confirm_password} = this.state
    if (password == confirm_password) this.props.dispatch(registerUserRequest({user_name, password}))
  }
  render() {
    return (
      <form className="Register container" onSubmit={this.submit}>
        <label className="is-size-4">Username:
          <input style={{margin: '0.5vw'}} className="input is-medium is-rounded" type="text" name="user_name" onChange={this.updateDetails}/>
        </label><br/>
        <label className="is-size-4">Password:
          <input style={{margin: '0.5vw'}} className="input is-medium is-rounded" type="password" name="password" onChange={this.updateDetails}/>
        </label><br/>
        <label className="is-size-4">Confirm:
          <input style={{margin: '0.5vw'}} className="input is-medium is-rounded" type="password" name="confirm_password" onChange={this.updateDetails}/>
        </label><br/>
          <input className="button is-medium is-success is-outlined" type="submit" />
      </form>
    )
  }
}

export default connect()(Register)
