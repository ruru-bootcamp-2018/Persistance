import React from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../../reducers';
import MissionToolTip from './MissionToolTip';
import { Tooltip } from 'react-tippy';
import { Mission } from './MissionToolTip';

type Props = {
    mission: Mission;
    number: number;
}

const Mission = (props: Props) => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const { outcome } = props.mission;
    const glow =
        useSelector(state => state.currentGame.currentMission.mission_num === props.number + 1)
            ? 'cake'
            : '';
    const iconDrop =
        useSelector(state => state.currentGame.currentMission.mission_num > props.number + 1);

    return (
        <Tooltip
            position="bottom"
            trigger="mouseenter"
            html={
                <MissionToolTip
                    mission={props.mission}
                    players={useSelector(state => state.currentGame.players)}
                />
            }
        >
            <h2
                className={`innerShadow level-item circles has-text-centered has-text-black is-size-2 mission ${glow}`}
            >
                {iconDrop ? (
                    <img src={outcome ? '/fist.png' : '/dagger.png'} />
                ) : (
                    useSelector(state => state.missionParams[props.number].team_total)
                )}
            </h2>
            <br />
        </Tooltip>
    );
};

export default Mission;
