import React, { useEffect, useState } from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../../reducers';
import GameBoard from './GameBoard';
import Buttons from './Buttons';
import StatusBar from './StatusBar';
import ChatWindow from './ChatWindow';
import { updateCurrentGame } from '../../actions/currentGame';
import Votes from '../Modals/Votes';
import GameOver from '../Modals/GameOver';
import IntentionsSuspense from '../Modals/IntentionsSuspense';
import Hammer from '../Modals/Hammer';
import HammerFail from '../Modals/HammerFail';
import { number } from 'prop-types';

const Game = () => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const [stage, setStage] = useState('');
    const [showVotes, setShowVotes] = useState(false);
    const [showIntentions, setShowIntentions] = useState(false);
    const [showHammerInfo, setShowHammerInfo] = useState(false);
    const [hammerFail, setHammerFail] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [mission, setMission] = useState({});
    const [round, setRound] = useState({});

    const gameStage = useSelector(state => state.currentGame.gameStage);
    const missions = useSelector(state => state.currentGame.missions);
    const leaderId = useSelector(
        state => state.currentGame.currentRound.leader_id
    );
    const hammerId = useSelector(
        state => state.currentGame.currentMission.hammer_id
    );
    const missionApproved = useSelector(
        state => state.currentMission.mission_approved
    );
    const hammerPlayer = useSelector(state =>
        state.currentGame.players.find((x: { id: number }) => x.id === hammerId)
    );
    const userId = useSelector(state => state.auth.user.id);
    const gameId = useSelector(state => state.match.params.id);

    useEffect(() => {
        const user_name = useSelector(state => state.auth.user.user_name);
        const localSocket = useSelector(state => state.socket);

        localSocket.emit('joinGame', gameId, user_name);
        localSocket.on('receiveUpdateGame', gameData => {
            const { dispatch } = useSelector(state => state);
            dispatch(updateCurrentGame(gameData.currentGame));
        });
    });

    useEffect(() => {
        if (stage === 'voting' && gameStage !== 'voting') grabVotes(missions);
        if (stage === 'intentions' && gameStage !== 'intentions')
            sortIntentions(missions);
        if (gameStage === 'goodWin' || gameStage === 'spyWin')
            setGameOver(true);
        if (stage === 'nominating' && leaderId === hammerId)
            setShowHammerInfo(true);
        if (round.round_num === 5 && missionApproved === false)
            setHammerFaile(true);
        setStage(gameStage);
    }, [gameStage, leaderId, hammerId, missions, missionApproved]);

    const grabVotes = missions => {
        let mission = missions[missions.length - 1];
        let round = mission.rounds
            .slice()
            .reverse()
            .find(x => x.votes.length > 0);
        this.setState({ showVotes: true, round: round });
    };

    const sortIntentions = missions => {
        let mission = missions
            .slice()
            .reverse()
            .find(x => x.intentions.length > 0);
        let team = mission.intentions.map(member => {
            let player = this.props.currentGame.players.find(
                x => x.id == member.user_id
            );
            return player;
        });

        let intentions = mission.intentions.map(x => x.intention);
        if (Math.random() > 0.5) this.shuffleArray(intentions);
        else intentions.sort((a, b) => b - a);
        setShowIntentions(true);
        setMission({ intentions, team, outcome: mission.outcome });
    };

    const shuffleArray = a => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const hideModal = () => {
        setShowVotes(false);
        setShowIntentions(false);
        setShowHammerInfo(false);
        setHammerFail(false);
    };

    const hideGameOver = () => {
        setGameOver(false);
    };

    return (
        <div className="container">
            <StatusBar leader={leaderId === userId} />
            <Buttons />
            <GameBoard />
            {showVotes && <Votes hideModal={hideModal} round={round} />}
            {gameOver && <GameOver hideModal={hideGameOver} />}
            {showIntentions && (
                <IntentionsSuspense hideModal={hideModal} mission={mission} />
            )}
            {showHammerInfo && (
                <Hammer hideModal={hideModal} hammer={hammerPlayer} />
            )}
            {hammerFail && <HammerFail hideModal={hideModal} />}
            <div style={{ marginTop: '1vw' }} className="ChatContainer">
                <ChatWindow id={gameId} />
            </div>
        </div>
    );
};

export default Game;
