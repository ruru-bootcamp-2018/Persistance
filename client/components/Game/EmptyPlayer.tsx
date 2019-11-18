import React from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { Tooltip } from 'react-tippy';
import PlayerToolTip from './PlayerToolTip';
import { AppState } from '../../reducers';

const roundStyleObj = {
    borderRadius: '50%',
    height: '120px',
    width: '120px',
};

const EmptyPlayer = () => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const player = useSelector(state => state.player);

    return (
        <Tooltip
            position="bottom"
            trigger="mouseenter"
            html={<PlayerToolTip player={player} />}
        >
            <div className="player">
                <p className="has-text-white is-size-5">
                    {' '}
                    {player.display_name || player.user_name}{' '}
                </p>
                <img style={roundStyleObj} src={player.img} />
            </div>
        </Tooltip>
    );
};

export default EmptyPlayer;
