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
    console.log(game.currentGame.missions[0].rounds);

    console.log(game.currentGame.players)

    console.log(game.currentGame.missions[0])

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
                return (<tr key={i}>
                  <td>{i + 1}</td>
                  <td>*</td>
                  <td>*</td>
                  <td>*</td>
                  <td>*</td>
                  <td>*</td>
                  <td>*</td>
                  <td>*</td>
                  <td>*</td>
                  <td>{mission.intentions.map( (intent, i) => {
                    return (<span key={i}>{intent.intention ? "pass, " : "fail, " }</span>)
                  })}</td>
                </tr>)
              })
            }
          </tbody>


        </table>
        some text
      <table>
          {/*//////////////this is a temp header/////////////////////////////////////*/}

          <thead>
            <tr>
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
              <th colSpan="3"></th>
              {
                game.currentGame.players.map((player, i) => {
                  return <th key={i}>{player.display_name || player.user_name}:</th>
                })
              }
            </tr>
          </thead>



          {/*//////////////end of temp header ////////////////////////*/}
          <tbody>
            {game.currentGame.missions[0].rounds.map((round, i) => {
              return displayRound(round, i)
            })}
          </tbody>
        </table>


      </div>)
  }

}

function displayRound(round, i) {
  return (
    <tr key={i}>
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