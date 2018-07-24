import React from 'react'
import { connect } from 'react-redux'
import { Tooltip } from 'react-tippy'
import Template from './Template'
import PlayerToolTip from './PlayerToolTip'
import { sendNomination, removeNomination } from '../../actions/playerInputs'


const roundStyleObj = {
    borderRadius: "50%",
    height: "120px",
    width: "120px"
}

class Player extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isNominated: false,
            roundId: 0,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const user = { id: this.props.auth.user.id } //needs to be from auth
        const nom = { user, game: this.props.currentGame.game, nomination: { user: this.props.player } }

        const { round_num } = this.props.currentGame.currentRound
        const { mission_num } = this.props.currentGame.currentMission

        const noms = this.props.currentGame.missions[mission_num - 1].rounds[round_num - 1].nominations
        const reqNoms = this.props.missionParams[mission_num -1].team_total
        const allNoms = reqNoms == noms.length

        if (!this.state.isNominated) {
            if (allNoms) return

            sendNomination(nom)
                .then(res => {
                    const localSocket = this.props.socket
                    const gameData = res.body
                    const game_id = nom.game.id
                    localSocket.emit('updateGameRoom', gameData, game_id)

                    this.setState({ isNominated: true, roundId: this.props.currentGame.currentRound.id })
                })

        } else {
            removeNomination(nom)
                .then(res => {
                    const localSocket = this.props.socket
                    const gameData = res.body
                    const game_id = nom.game.id
                    localSocket.emit('updateGameRoom', gameData, game_id)

                    this.setState({ isNominated: false, roundId: this.props.currentGame.currentRound.id })
                })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isNominated && nextProps.currentGame.currentRound.id != this.state.roundId) this.setState({ isNominated: false })
        const { mission_num } = nextProps.currentGame.currentMission
        const { round_num } = nextProps.currentGame.currentRound
        const nominations = nextProps.currentGame.missions[mission_num - 1].rounds[round_num - 1].nominations
        const nominatedUser = nominations.find(player => player.user_id == nextProps.player.id)
        if (nominatedUser && this.state.isNominated == false) this.setState({ isNominated: true })
    }

    render() {

        const authID = this.props.auth.user.id
        const id = authID // this needs to be auth user id

        const currentUser = this.props.currentGame.players.find(player => player.id == id)
        const userIsSpy = currentUser.role == 'spy'
        const { display_name, user_name, img } = this.props.player
        const isLeader = this.props.leader == this.props.player.id

        const isNominating = (this.props.leader == authID && this.props.currentGame.gameStage == 'nominating')
        const isHammer = this.props.hammer == this.props.player.id
        const isSpy = this.props.player.role == 'spy' && userIsSpy
        const isNominated = this.state.isNominated == true

        const glow = (isNominated && isSpy) ? 'nominated-spy-glow' : isSpy ? 'spy-glow' : isNominated ? 'nominated-glow' : ''

        return (
            <div>
                {isLeader && <img className="statusIcon" src="/crown.png" />}
                {isHammer && <img className="statusIcon" src="/hammer.png" />}
                <Tooltip
                    // options
                    position="bottom"
                    trigger="mouseenter"
                    html={(
                        <PlayerToolTip player={this.props.player} authID={authID} isHammer={isHammer} isLeader={isLeader} />
                    )}
                >

                    <div onClick={(isNominating) && this.handleClick} className="player" >
                        <p className="is-size-5"> {`${display_name || user_name}`}</p>
                        <img className={glow} style={roundStyleObj} src={img} />
                    </div>


                </Tooltip>
            </div>

        )

    }

}



const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Player)
