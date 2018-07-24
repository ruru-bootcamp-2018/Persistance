import React from 'react'
import { connect } from 'react-redux'

class Intentions extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Modal title</p>
                <button className="delete" onClick={this.props.hideModal} aria-label="close"></button>
              </header>
              <section className="modal-card-body">
                Intentions go here
              </section>
              <footer className="modal-card-foot">
                <button className="button is-fullwidth is-warning" onClick={this.props.hideModal}>Hide</button>
              </footer>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Intentions)