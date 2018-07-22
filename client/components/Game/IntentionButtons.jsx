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
    const user = {id: 1} //needs to be from auth
    const intention = {user, game: this.props.currentGame.game, intention: (e.target.value == 'pass')}
    sendIntention(intention)
    this.setState({hasCastIntention: true})
  
}
render() {  
    return (
    <div>
     <button onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="pass" className="button is-medium is-dark is-outlined"><i className="fas fa-check"></i></button>
     <button onClick={(e) => this.handleClick(e)} style={{marginBottom: '0.5vw'}} value="fail" className="button is-medium is-dark is-outlined"><i className="fas fa-times"></i></button>
     </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(IntentionButtons)