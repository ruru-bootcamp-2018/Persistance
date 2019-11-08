import React, { MouseEvent, useState } from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { confirmNominations } from '../../actions/playerInputs';
import { AppState } from '../../reducers';

const ConfirmNom = () => {
    const [hasFinishedNomming, setHasFinishedNomming] = useState(false);
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const { currentGame, socket } = useSelector(state => state);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const confirm = e.currentTarget.value === 'true';

        if (confirm) {
            confirmNominations(currentGame).then(res => {
                const localSocket = socket;
                const gameData = res.body;
                const game_id = currentGame.game.id;

                localSocket.emit('updateGameRoom', gameData, game_id);
                setHasFinishedNomming(true);
            });
        }
    };

    return hasFinishedNomming ? (
        <div>
            <button
                disabled
                onClick={e => handleClick(e)}
                value="true"
                style={{ marginBottom: '0.5vw' }}
                className="button raise is-success is-large is-outlined"
            >
                <i className="fas fa-check"></i>
            </button>
        </div>
    ) : (
        <div>
            <button
                onClick={e => handleClick(e)}
                value="true"
                style={{ marginBottom: '0.5vw' }}
                className="button raise-green is-success is-large is-outlined"
            >
                <i className="fas fa-check"></i>
            </button>
        </div>
    );
};

export default ConfirmNom;
