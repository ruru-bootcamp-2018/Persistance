import React from 'react';

type Round = {
    nominations: Member[];
};

type Member = {
    user_id: number;
};

type Player = {
    id?: number;
    user_id?: number;
    user_name: string;
    display_name: string;
};

type Intention = {
    intention: string;
};

export type Mission = {
    outcome: string | null;
    rounds: Round[];
    intentions: Intention[];
};

type Props = {
    mission: Mission;
    players: Player[];
};

const MissionToolTip = (props: Props) => {
    let missionTeam, intentions, passes, fails;
    if (props.mission.outcome !== null) {
        let rounds = props.mission.rounds;
        missionTeam = rounds[rounds.length - 1].nominations;
        intentions = props.mission.intentions;
        passes = intentions.reduce((acc, x) => {
            if (x.intention) acc++;
            return acc;
        }, 0);
        fails = intentions.length - passes;
    }
    const { outcome } = props.mission;

    return (
        <div>
            {missionTeam &&
                missionTeam.map(member => {
                    let player: Player | undefined = props.players.find(
                        x => x.id == member.user_id
                    );
                    return (
                        <p
                            key={player ? player.user_id : ''}
                            className="has-text-weight-bold"
                        >
                            {player
                                ? player.display_name || player.user_name
                                : ''}
                        </p>
                    );
                })}
            <div>
                {outcome !== null && (
                    <div className="level">
                        {' '}
                        <p className="is-size-5 has-text-weight-bold">
                            {passes ? passes : 0}
                        </p>{' '}
                        <img
                            className="tinyThumbLeft level-item"
                            src="/fist.png"
                        />
                        <p className="is-size-5 has-text-weight-bold">
                            {fails ? fails : 0}
                        </p>{' '}
                        <img
                            className="tinyThumbLeft level-item"
                            src="/dagger.png"
                        ></img>{' '}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionToolTip;
