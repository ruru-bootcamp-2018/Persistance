import request from '../utils/api';

export function getPlayersForGame(players) {
    return {
        type: 'RECEIVE_PLAYERS',
        players,
    };
}

export function getPlayers(game_id) {
    return dispatch => {
        return request('get', `temporary/roles/${game_id}`)
            .then(res => {
                dispatch(getPlayersForGame(res.body));
            })
            .catch(err => {
                console.log('request failed');
            });
    };
}
