import React, { MouseEvent, useState } from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { sendVote } from '../../actions/playerInputs';
import { AppState } from '../../reducers';

const ChoiceButton = () => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const [hasVoted, setHasVoted] = useState(false);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const user = { id: useSelector(state => state.auth.user.id) };
        const vote = {
            user,
            game: useSelector(state => state.currentGame.game),
            vote: e.currentTarget.value === 'true',
        };
        sendVote(vote).then(res => {
            const localSocket = useSelector(state => state.socket);
            const gameData = res.body;
            const game_id = vote.game.id;

            localSocket.emit('updateGameRoom', gameData, game_id);
            setHasVoted(true);
        });
    };

    return hasVoted ? (
        <div>
            <button
                disabled
                onClick={e => handleClick(e)}
                value="true"
                style={{ marginBottom: '0.5vw' }}
                className="no"
            >
                <img src="/Approve.png" className="voteCheck nono" />
            </button>
            <button
                disabled
                onClick={e => handleClick(e)}
                value="false"
                style={{ marginBottom: '0.5vw' }}
                className="no"
            >
                <img src="/Reject.png" className="voteCross nono" />
            </button>
        </div>
    ) : (
        <div>
            <button
                onClick={e => handleClick(e)}
                value="true"
                style={{ marginBottom: '0.5vw' }}
                className="no"
            >
                <img src="/Approve.png" className="voteCheck raise-white" />
            </button>
            <button
                onClick={e => handleClick(e)}
                value="false"
                style={{ marginBottom: '0.5vw' }}
                className="no"
            >
                <img src="/Reject.png" className="voteCross raise-black" />
            </button>
        </div>
    );
};

export default ChoiceButton;
