import React from 'react'
import { connect } from 'react-redux'

const roundStyleObj = {
    borderRadius: "50%",
    height: "120px",
    width: "120px"
}

class Votes extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
    const passes = this.props.round.votes.reduce((acc, x) => {
      if (x.vote) acc++
      return acc
    }, 0)
    const result = (passes > this.props.round.votes.length / 2) ? 'Passed' : 'Rejected'
        return (
            <div className="modal is-active is-dark">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head modal-color">
                <p className="modal-card-title">Vote was {result}</p>
                <button className="delete" onClick={this.props.hideModal} aria-label="close"></button>
              </header>
              <section className="modal-card-body modal-color">
                <div className='columns is-multiline modal-color'>
                {this.props.currentGame.players.map((player) => (
                  <div className={`column is-${12 / this.props.currentGame.players.length}`}>
                    <p>{player.display_name || player.user_name} voted {this.props.round.votes.find(vote => vote.user_id == player.id).vote ? 'Approve' : 'Reject'}</p>
                    <img src={player.img} style={roundStyleObj} />
                    <img className="has-text-white" style={roundStyleObj} src={this.props.round.votes.find(vote => vote.user_id == player.id).vote ? '/approve.png' : '/reject.png'} />
                  </div>))}
                </div>
              </section>
              <footer className="modal-card-foot modal-color">
                <button className="button is-fullwidth is-dark" onClick={this.props.hideModal}>Hide</button>
              </footer>
            </div>
          </div>
        )
    }
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Votes)
