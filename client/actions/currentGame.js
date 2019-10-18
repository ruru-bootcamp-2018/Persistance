import request from '../utils/api';

export const UPDATE_GAME = 'UPDATE_GAME';
export const UPDATE_ROUND = 'UPDATE_ROUND';
export const UPDATE_MISSION = 'UPDATE_MISSION';
export const GET_PARAMS = 'GET_PARAMS';

export const updateCurrentGame = currentGame => ({
    type: UPDATE_GAME,
    currentGame,
});

export const updateCurrentRound = currentRound => ({
    type: UPDATE_ROUND,
    currentRound,
});

export const updateCurrentMission = currentMission => ({
    type: UPDATE_MISSION,
    currentMission,
});

export const updateMissionParams = missionParams => ({
    type: GET_PARAMS,
    missionParams,
});

export const getGameState = () => dispatch =>
    request('get', 'game/current')
        .then(({ body }) => {
            dispatch(updateCurrentGame(body.currentGame));
            dispatch(updateCurrentRound(body.currentRound));
            dispatch(updateCurrentMission(body.currentMission));
            dispatch(updateMissionParams(body.missionParams));
        })
        .catch(err => console.log(err));
