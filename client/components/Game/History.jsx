import React from 'react'
import { connect } from 'react-redux'

const game = require('../../../server/fakeData/mission2')

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    console.log(game);

    return (
      <table className="history table">
        <thead>
          <tr>
            <th>
              Mission:
            </th>
            <th>
              Round:
            </th>
            <th>
              Leader:
            </th>
            <th>
              Team:
            </th>
            {/* {
              game.currentGame.players.map((player, i) => {
                return <th key={i}>{player.display_name || player.user_name}</th>
              })
            } */}
            <th colSpan={game.currentGame.players.length} className="has-text-centered">
              Votes:
            </th>


            <th>
              Result
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th colSpan="4"></th>
            {
              game.currentGame.players.map((player, i) => {
                return <th key={i}>{player.display_name || player.user_name}:</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            game.currentGame.missions.map((mission, i) => {
              return (<tr key={i}>
                <td>{i + 1}</td>
                <table>
                  {mission.rounds.map( (round, j)=> {
                    return (<tr>
                      <td>{j+1}</td>
                    </tr>)
                  })}
                </table>
              </tr>)
            })
          }
        </tbody>


      </table>)
  }

}

const mapStateToProps = (state) => state

export default History