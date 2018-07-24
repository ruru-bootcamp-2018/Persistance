import React from 'react'
import { connect } from 'react-redux'

class GameOver extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const message = this.props.currentGame.gameStage == 'goodWin' ? "The loyalists have persited in their attempts" : "The spies have succeded in throwing the missions"
        return (
            <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Game Over</p>
                <button className="delete" onClick={this.props.hideModal} aria-label="close"></button>
              </header>
              <section className="modal-card-body">
                {message}
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

export default connect(mapStateToProps)(GameOver)