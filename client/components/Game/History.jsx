import React from 'react'
import { connect } from 'react-redux'

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.getName = this.getName.bind(this);
    this.findPlayer = this.findPlayer.bind(this);
    this.showName = this.showName.bind(this);
    this.displayRound = this.displayRound.bind(this);


  }

  getName(id) {
    return this.showName(this.findPlayer(id))
  }

  findPlayer(targetId) {
    return this.props.currentGame.players.find((player) => {
      return player.id == targetId
    })
  }

  showName(player) {
    return (

      //<img className="image is-16x16" style=${{borderRadius:"50%"}} src=${player.img} />
      player.display_name || player.display_name

    );
  }

  displayRound(round, i, j, roundLength, intentions) {
    const pass = 'Pass, ';
    const fail = 'Fail, ';
    const approve = 'Yes';
    const reject = 'No';
    return (
      <tr key={`${i}-${j}`}>
        <td>{(j == 0) ? i + 1 : ""}</td>
        <td>{round.round_num}</td>
        <td>{this.getName(round.leader_id)}</td>
        <td>
          {round.nominations.map((nom) => {
            return this.getName(nom.user_id) + ', '
          })}
        </td>

        { round.votes.map((vote, i) => {
            return (<td key={i}>{vote.vote ? <div>{approve}</div> : <div>{reject}</div>}</td>);
          })
        }

        <td>
          {(j == roundLength-1) ? intentions.map( (intention, i) => <span key={i}>{intention.intention ? pass : fail}</span>) : ""}
        </td>
      </tr>
    )
  }

  componentDidMount() {

  }

  render() {
    const {currentGame} = this.props;

    const game = {currentGame}
    return (
      <div className="container">
        <table className="history table is-fullwidth is-bordered has-text-centered is-hoverable is-striped">
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
                  return <th key={i}>{this.showName(player)}:</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              game.currentGame.missions.map((mission, i) => {
                return mission.rounds.map((round, j) => {
                  return this.displayRound(round, i, j, mission.rounds.length, mission.intentions)
                })
              })
            }
          </tbody>


        </table>

      </div>)
  }

}

// function displayRound(round, i, j, roundLength, intentions) {
//   const pass = 'Pass, ';
//   const fail = 'Fail, ';
//   const approve = 'Yes';
//   const reject = 'No';
//   return (
//     <tr key={`${i}-${j}`}>
//       <td>{(j == 0) ? i + 1 : ""}</td>
//       <td>{round.round_num}</td>
//       <td>{this.getName(round.leader_id)}</td>
//       <td>
//         {round.nominations.map((nom) => {
//           return this.getName(nom.user_id) + ', '
//         })}
//       </td>

//       { round.votes.map((vote, i) => {
//           return (<td key={i}>{vote.vote ? <div>{approve}</div> : <div>{reject}</div>}</td>);
//         })
//       }

//       <td>
//         {(j == roundLength-1) ? intentions.map( (intention, i) => <span key={i}>{intention? pass : fail}</span>) : ""}
//       </td>
//     </tr>
//   )
// }

// function getName(id) {
//   return showName(findPlayer(id))
// }

// function findPlayer(targetId) {
//   return game.currentGame.players.find((player) => {
//     return player.id == targetId
//   })
// }

// function showName(player) {
//   return (

//     //<img className="image is-16x16" style=${{borderRadius:"50%"}} src=${player.img} />
//     player.display_name || player.display_name

//   );
// }

const mapCakeToProps = (state) => state

export default connect(mapCakeToProps)(History)
