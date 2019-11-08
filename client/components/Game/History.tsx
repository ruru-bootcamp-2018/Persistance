import React from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../../reducers';

type RoundProps = {
    round_num: number;
    leader_id: number;
    nominations: {
        user_id: number;
    }[];
    votes: {
        vote: boolean;
    }[];
};

type IntentionsProps = { intention: boolean }[];

type MissionProps = {
    rounds: RoundProps[];
    intentions: IntentionsProps;
    i: number;
};

type PlayerProps = {
    display_name?: string;
    id?: number;
};

const History = () => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const { currentGame } = useSelector(state => state);

    const getName = (id: number) => {
        return showName(findPlayer(id));
    };

    const findPlayer = (targetId: number) => {
        return useSelector(state =>
            state.currentGame.players.find((player: PlayerProps) => {
                return player.id === targetId;
            })
        );
    };

    const showName = (player: PlayerProps) => {
        return player.display_name;
    };

    const displayRound = (
        round: RoundProps,
        i: number,
        j: number,
        roundLength: number,
        intentions: IntentionsProps
    ) => {
        const pass = 'Pass, ';
        const fail = 'Fail, ';
        const approve = 'Yes';
        const reject = 'No';
        return (
            <tr key={`${i}-${j}`}>
                <td>{j === 0 ? i + 1 : ''}</td>
                <td>{round.round_num}</td>
                <td>{getName(round.leader_id)}</td>
                <td>
                    {round.nominations.map(nom => {
                        return getName(nom.user_id) + ', ';
                    })}
                </td>
                {round.votes.map((vote, i) => {
                    return (
                        <td key={i}>
                            {vote.vote ? (
                                <div>{approve}</div>
                            ) : (
                                <div>{reject}</div>
                            )}
                        </td>
                    );
                })}
                <td>
                    {j === roundLength - 1
                        ? intentions.map((intention, i) => (
                              <span key={i}>
                                  {intention.intention ? pass : fail}
                              </span>
                          ))
                        : ''}
                </td>
            </tr>
        );
    };

    return (
        <div className="container">
            <table className="history table is-fullwidth is-bordered has-text-centered is-hoverable is-striped">
                <thead>
                    <tr>
                        <th>Mission:</th>
                        <th>Round:</th>
                        <th>Leader:</th>
                        <th>Team:</th>
                        <th
                            colSpan={currentGame.players.length}
                            className="has-text-centered"
                        >
                            Votes:
                        </th>
                        <th>Result</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th colSpan={4}></th>
                        {currentGame.players.map(
                            (player: PlayerProps, i: number) => {
                                return <th key={i}>{showName(player)}:</th>;
                            }
                        )}
                    </tr>
                </thead>
                <tbody>
                    {currentGame.missions.map(
                        (mission: MissionProps, i: number) => {
                            return mission.rounds.map((round, j) => {
                                return displayRound(
                                    round,
                                    i,
                                    j,
                                    mission.rounds.length,
                                    mission.intentions
                                );
                            });
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default History;
