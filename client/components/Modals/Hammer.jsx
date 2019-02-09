import React from 'react'
import { connect } from 'react-redux'

class Hammer extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="modal is-active is-dark has-text-centered">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head modal-color">
                <p className="modal-card-title has-text-white is-size-1">This is the hammer round!</p>
                <button className="delete" onClick={this.props.hideModal} aria-label="close"></button>
              </header>
              <section className="modal-card-body modal-color">
                <div className='has-text-centered is-size-5 columns is-multiline modal-color'>
                <p> This round, the vote track has hit five, and {this.props.hammer.display_name} who is the hammer is the leader.
                If this team does not go on the mission, the spies will win this round.
                Vote carefully!</p>
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

export default connect(mapStateToProps)(Hammer)