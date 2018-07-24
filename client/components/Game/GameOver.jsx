import React from 'react'
import { connect } from 'react-redux'

import {Tooltip} from 'react-tippy'

const roundStyleObj = {
  borderRadius: "50%",
  height: "120px",
  width: "120px"
}

class GameOver extends React.Component{
  render(){
    const {players, gameStage} = this.props.currentGame
    const message = gameStage == 'goodWin'
      ? "The loyalists have persisted in their attempts"
      : "The spies have succeded in throwing the missions"
    const isRole = check => ({role}) => role == check
    const goodies = players.filter(isRole('good'))

    return (
        <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Game Over</p>
            <button className="delete" onClick={this.props.hideModal} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
          <div className="is-size-3">
            {message}
            </div>
            <div className="columns">

              <div className="column is-three-fifths card">
                <div className="card-content">
                  <div className="title">
                  The Loyalists:
                  </div>
                  <hr />
                  <div className="columns is-multiline">
                    {goodies.map((goody, i) => <div className={`column is-${
                      goodies.length % 2 == 1 && i == goodies.length - 1 ? '12' : '6'}`}>
                      <Tooltip
                          // options
                          position="bottom"
                          trigger="mouseenter"
                          html={(
                            <h1>{goody.display_name || goody.user_name} - Loyalist</h1>
                          )}
                      >
                        <img style={roundStyleObj} src={goody.img} />
                      </Tooltip>
                    </div>)}
                  </div>
                </div>
              </div>

              <div className="card column is-two-fifths">
                <div className="card-content">
                  <div className="title">
                  The Spies:
                  </div>
                  <hr />
                  <div className="columns is-multiline">
                    {players.filter(isRole('spy')).map(spy => <div className="column is-12">
                      <Tooltip
                          // options
                          position="bottom"
                          trigger="mouseenter"
                          html={(
                            <h1>{spy.display_name || spy.user_name} - Spy</h1>
                          )}
                      >
                        <img className="spy-glow" style={roundStyleObj} src={spy.img} />
                      </Tooltip>
                    </div>)}
                  </div>
                </div>
              </div>

            </div>

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
