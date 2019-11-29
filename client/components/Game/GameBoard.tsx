import React from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../../reducers';

import Mission from './Mission';
import Player from './Player';
import RoundCounter from './RoundCounter';

type Player = {
    role: string;
}

const GameBoard = () => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const { currentGame } = useSelector(state => state);
    const { players, missions, currentMission, currentRound } = currentGame;
    const { hammer_id } = currentMission;
    const { round_num, leader_id } = currentRound;
    const halfPlayersIndex = Math.round(players.length / 2);
    const missionDisplay = Array(5)
        .fill(0)
        .map((x, i) => (missions[i] ? missions[i] : { outcome: null }));

    return (
        <div className="columns">
            <div className="column is-2">
                {players.slice(0, halfPlayersIndex).map((player: Player, i: number) => {
                    return (
                        <Player
                            key={i}
                            player={player}
                            leader={leader_id}
                            hammer={hammer_id}
                        />
                    );
                })}
            </div>
            <div className="column is-8">
                <h1>
                    {players.map((x: Player, i: number) => {
                        if (x.role == 'spy')
                            return (
                                <img
                                    key={i}
                                    className="spyIcon"
                                    src="/spy.png"
                                />
                            );
                    })}
                </h1>
                <div className="mission-board">
                    <p className="is-size-3 has-text-white">Missions</p>
                    <div className="level missionDisplay">
                        {missionDisplay.map((mission, i) => {
                            return (
                                <Mission
                                    key={i}
                                    mission={mission}
                                    number={i}
                                />
                            );
                        })}
                    </div>
                    <p className="voteTrack is-size-3 has-text-white">
                        Vote Track
                    </p>
                    <div className="columns is-centered">
                        {Array(5)
                            .fill(0)
                            .map((x, i) => {
                                return (
                                    <RoundCounter
                                        key={i}
                                        number={i + 1}
                                        round_num={round_num}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="column is-2">
                {players.slice(halfPlayersIndex).map((player: Player, i: number) => {
                    return (
                        <Player
                            key={i}
                            player={player}
                            leader={leader_id}
                            hammer={hammer_id}
                        />
                    );
                })}
            </div>
        </div>
    );    
}

export default GameBoard;
