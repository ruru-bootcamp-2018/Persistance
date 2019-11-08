import React, { MouseEvent, useState } from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { sendIntention } from '../../actions/playerInputs';
import { AppState } from '../../reducers';

const IntentionButtons = () => {
    const [hasCastIntention, setHasCastIntention] = useState(false);
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const userId = useSelector(state => state.auth.user.id);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (hasCastIntention) return;

        const user = { id: userId };
        const intention = {
            user,
            game: useSelector(state => state.currentGame.game),
            intention: e.currentTarget.value === 'pass',
        };
        sendIntention(intention).then(res => {
            const localSocket = useSelector(state => state.socket);
            const gameData = res.body;
            const game_id = intention.game.id;
            localSocket.emit('updateGameRoom', gameData, game_id);
            setHasCastIntention(true);
        });
    };

    const player = useSelector(state =>
        state.currentGame.players.find(
            (player: { id: number }) => player.id === userId
        )
    );

    const isSpy = player.role === 'spy';

    return !isSpy && !hasCastIntention ? (
        <div>
            <button
                className="no"
                onClick={e => handleClick(e)}
                style={{ marginBottom: '0.5vw' }}
                value="pass"
            >
                <img src="/success.png" className="intentionAccept raiseI" />
            </button>
            <button
                className="no"
                disabled
                onClick={e => handleClick(e)}
                style={{ marginBottom: '0.5vw' }}
                value="fail"
            >
                <img src="/fail.png" className="intentionReject nono" />
            </button>
        </div>
    ) : hasCastIntention ? (
        <div>
            <button
                className="no"
                disabled
                onClick={e => handleClick(e)}
                style={{ marginBottom: '0.5vw' }}
                value="pass"
            >
                <img src="/success.png" className="intentionAccept raiseI" />
            </button>
            <button
                className="no"
                disabled
                onClick={e => handleClick(e)}
                style={{ marginBottom: '0.5vw' }}
                value="fail"
            >
                <img src="/fail.png" className="intentionReject raiseI-red" />
            </button>
        </div>
    ) : (
        <div>
            <button
                className="no"
                onClick={e => handleClick(e)}
                style={{ marginBottom: '0.5vw' }}
                value="pass"
            >
                <img src="/success.png" className="intentionAccept raiseI" />
            </button>
            <button
                className="no"
                onClick={e => handleClick(e)}
                style={{ marginBottom: '0.5vw' }}
                value="fail"
            >
                <img src="/fail.png" className="intentionReject raiseI-red" />
            </button>
        </div>
    );
};

export default IntentionButtons;
