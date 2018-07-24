import React from 'react'



class IntentionsSuspense extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasStarted: false,
      hasEnded: false,
      revealed: 0
    }
    this.timeout = null
    this.tick = this.tick.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }
  start() {
    this.setState({hasStarted: true})
    this.timeout = setTimeout(() => this.tick(), 1500)
  }
  tick() {
    let {revealed} = this.state
    revealed++    
    this.setState({revealed})
    if (revealed >= this.props.mission.intentions.length) this.stop()
    else this.timeout = setTimeout(() => this.tick(), revealed * 1000)
  }
  stop() {
    window.clearTimeout(this.timeout)
    this.setState({hasEnded: true})
  }

 

  render() {
    const {intentions, team, outcome} = this.props.mission
    const {hasStarted, hasEnded, revealed} = this.state
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Mission Intentions</p>
        </header>
        <section className="modal-card-body">
          <h1 className="title">
            {!hasStarted
              ? 'All shall be revealed...'
              : hasEnded
                ? outcome
                  ? 'The Mission was a success!'
                  : 'The Mission has failed!'
                : 'Reveal in progress...'
            }
          </h1>
          <h2 className="subtitle">
            The Team:
          </h2>
          <div className="columns is-multiline">
            {team.map(name => <div className="column is-4">{name}</div>)}
          </div>
          <hr />
          {intentions.map((intention, i) => <div className={`box ${
            i < revealed
              ? ''
              : intention ? 'is-success' : 'is-danger'
          }`}>
            {hasStarted
              ? i < revealed
                ? intention
                  ? 'Success'
                  : 'Fail'
                : '...'
              : 'Pending...'
            }
          </div>)}
        </section>
        <footer className="modal-card-foot">
          {!hasStarted && <button className="button is-fullwidth" onClick={this.start}>Reveal!</button>}
          {hasEnded && <button onClick={this.props.hideModal} className="button is-fullwidth">Close</button>}
        </footer>
      </div>
    </div>
  }
}

export default IntentionsSuspense