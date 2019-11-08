import React, { useEffect, useState } from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../../reducers';
import { Tooltip } from 'react-tippy';
import PlayerToolTip from './PlayerToolTip';
import { sendNomination, removeNomination } from '../../actions/playerInputs';

const roundStyleObj = {
    borderRadius: '50%',
    height: '80px',
    width: '80px',
};

const Player = () => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const [isNominated, setIsNominated] = useState(false);
    const [roundId, setRoundId] = useState(0);

    const { leader, hammer } = useSelector(state => state);
    const { display_name, user_name, img, id, role } = useSelector(
        state => state.player
    );
    const authId = useSelector(state => state.auth.user.id);
    const gameStage = useSelector(state => state.currentGame.gameStage);
    const currentUser = useSelector(state =>
        state.currentGame.players.find(player => player.id === authId)
    );
    const { round_num } = useSelector(state => state.currentGame.currentRound);
    const { mission_num } = useSelector(
        state => state.currentGame.currentMission
    );
    const noms = useSelector(
        state =>
            state.currentGame.missions[mission_num - 1].rounds[round_num - 1]
                .nominations
    );

    const userIsSpy = currentUser.role === 'spy';
    const isSpy = role === 'spy' && userIsSpy;
    const isHammer = hammer === id;
    const isLeader = leader === id;
    const isNominating = leader === authId && gameStage === 'nominating';
    const isNominatedNew = noms.some(
        (nom: { user_id: number }) => nom.user_id == id
    );
    const glow =
        isNominatedNew && isSpy
            ? 'nominated-spy-glow'
            : isSpy
            ? 'spy-glow'
            : isNominatedNew
            ? 'nominated-glow'
            : '';

    const handleClick = () => {
        const user = { id: useSelector(state => state.auth.user.id) };
        const nom = {
            user,
            game: useSelector(state => state.currentGame.game),
            nomination: { user: useSelector(state => state.player) },
        };
        const { round_num } = useSelector(
            state => state.currentGame.currentRound
        );
        const { mission_num } = useSelector(
            state => state.currentGame.currentMission
        );
        const noms = useSelector(
            state =>
                state.currentGame.missions[mission_num - 1].rounds[
                    round_num - 1
                ].nominations
        );
        const reqNoms = useSelector(
            state => state.missionParams[mission_num - 1].team_total
        );
        const allNoms = reqNoms == noms.length;

        if (!isNominated) {
            if (allNoms) return;

            sendNomination(nom).then(res => {
                const localSocket = useSelector(state => state.socket);
                const gameData = res.body;
                const game_id = nom.game.id;
                localSocket.emit('updateGameRoom', gameData, game_id);

                setIsNominated(true);
                setRoundId(
                    useSelector(state => state.currentGame.currentRound.id)
                );
            });
        } else {
            removeNomination(nom).then(res => {
                const localSocket = useSelector(state => state.socket);
                const gameData = res.body;
                const game_id = nom.game.id;
                localSocket.emit('updateGameRoom', gameData, game_id);

                setIsNominated(false);
                setRoundId(
                    useSelector(state => state.currentGame.currentRound.id)
                );
            });
        }
    };

    useEffect(() => {
        if (
            isNominated &&
            useSelector(state => state.currentGame.currentRound.id !== roundId)
        ) {
            setIsNominated(false);
            const { mission_num } = useSelector(
                state => state.currentGame.currentMission
            );
            const { round_num } = useSelector(
                state => state.currentGame.currentRound
            );
            const nominations = useSelector(
                state =>
                    state.currentGame.missions[mission_num - 1].rounds[
                        round_num - 1
                    ].nominations
            );
            const nominatedUser = nominations.find(
                player => player.user_id === id
            );
        }
    }, [
        useSelector(state => state.currentGame.currentRound.id),
        useSelector(state => state.player.id),
    ]);

    return (
        <div>
            {isLeader && <img className="statusIcon" src="/crown.png" />}
            {isHammer && <img className="statusIcon" src="/hammer.png" />}
            <Tooltip
                position="bottom"
                trigger="mouseenter"
                html={
                    <PlayerToolTip
                        player={useSelector(state => state.player)}
                        authID={authId}
                        isHammer={isHammer}
                        isLeader={isLeader}
                    />
                }
            >
                <div
                    onClick={() => {
                        isNominating && handleClick();
                    }}
                    className="player"
                >
                    <p className="has-text-white is-size-5">
                        {' '}
                        {`${display_name || user_name}`}
                    </p>
                    <img className={glow} style={roundStyleObj} src={img} />
                </div>
            </Tooltip>
        </div>
    );
};

export default Player;
