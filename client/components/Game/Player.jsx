import React from 'react'
import { connect } from 'react-redux'
import { Tooltip } from 'react-tippy'
import Template from './Template'
import PlayerToolTip from './PlayerToolTip'
import { sendNomination } from '../../actions/playerInputs'

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
            roundId: 0
        }
        this.handleClick = this.handleClick.bind(this)
        this.checkNewRound = this.checkNewRound.bind(this)
        this.checkIfNominated = this.checkIfNominated.bind(this)
    }

    handleClick() {
        if (this.state.isNominated) return
        //do somthing
        const user = { id: this.props.auth.user.id } //needs to be from auth
        const nom = { user, game: this.props.currentGame.game, nomination: { user: this.props.player } }
        sendNomination(nom)
        this.setState({ isNominated: true, roundId: this.props.currentGame.currentRound.id })
    }

    checkNewRound() {
        if (this.state.isNominated && this.props.currentGame.currentRound.id != this.state.roundId) this.setState({ isNominated: false })
    }

    checkIfNominated() {
        const { mission_num } = this.props.currentGame.currentMission
        const { round_num } = this.props.currentGame.currentRound
        const nominations = this.props.currentGame.missions[mission_num-1].rounds[round_num-1].nominations
        const  nominatedUser = nominations.find(player => player.user_id == this.props.player.id)
        if (nominatedUser && this.state.isNominated == false) this.setState ({ isNominated: true })
    }

    render() {

        const authID = this.props.auth.user.id        
        const id = authID // this needs to be auth user id

        const currentUser = this.props.currentGame.players.find(player => player.id == id)
        const userIsSpy = currentUser.role == 'spy'
        const { display_name, user_name, img } = this.props.player        
        const isNominating = (this.props.leader == authID && this.props.currentGame.gameStage == 'nominating')
        const isSpy = this.props.player.role == 'spy' && userIsSpy
        const glow = this.state.isNominated ? 'button-glow' : isSpy ? 'spy-glow' : ''
        this.checkNewRound()
        this.checkIfNominated()

        return (
            <Tooltip
                // options
                position="bottom"
                trigger="mouseenter"
                html={(
                    <PlayerToolTip player={this.props.player} />
                )}
            >

                <div onClick={(isNominating) && this.handleClick} className="player" >
                    <p className="is-size-5"> {`${display_name || user_name}`}</p>
                    <img className={glow} style={roundStyleObj} src={img} />
                </div>


            </Tooltip>

        )

    }

}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Player)
