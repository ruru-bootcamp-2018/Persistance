import React from 'react'
import { connect } from 'react-redux'

class Intentions extends React.Component{
    constructor(props){
        super(props)
    }

    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
    }

    render(){
        const intentions = this.props.currentGame.missions.slice().reverse().find(x => x.intentions.length > 0).intentions
        if (Math.random() > 0.5) this.shuffleArray([...intentions])
        else [...intentions].sort((a,b) => b.intention-a.intention)

        return (
            <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Modal title</p>
                <button className="delete" onClick={this.props.hideModal} aria-label="close"></button>
              </header>
              <section className="modal-card-body">
                {intentions.map(x => {
                  return <p className="is-size-3 has-text-black">{x.intention ? "SUCCEED" : "FAIL"}</p> 
                })}
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