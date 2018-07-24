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


    console.log(game.currentMission)

    return (
      <div>
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
                return mission.rounds.map((round, j) => {
                  return displayRound(round, i, j, mission.rounds.length, mission.intentions)
                })
              })
            }
          </tbody>


        </table>

      </div>)
  }

}

function displayRound(round, i, j, roundLength, intentions) {
  return (
    <tr key={`${i}-${j}`}>
      <td>{(j == 0) ? i + 1 : ""}</td>
      <td>{round.round_num}</td>
      <td>{getName(round.leader_id)}</td>
      <td>
        {round.nominations.map((nom) => {
          return getName(nom.user_id) + ', '
        })}
      </td>
      {/*here we map over the votes*/}
      {
        round.votes.map((vote, i) => {
          return (<td key={i}>{vote.vote ? <div>yes</div> : <div>no</div>}</td>);
        })

      }
      {/*end of vote map*/}
      <td>
        {(j == roundLength-1) ? intentions.map( (intention, i) => <span key={i}>{intention? "pass, " : "fail, "}</span>) : ""}
      </td>
    </tr>
  )
}

function getName(id) {
  return showName(findPlayer(id))
}

function findPlayer(targetId) {
  return game.currentGame.players.find((player) => {
    return player.id == targetId
  })
}

function showName(player) {
  return player.display_name || player.user_name;
}

const mapStateToProps = (state) => state

export default History