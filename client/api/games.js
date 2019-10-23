import request from '../utils/api';

import { receiveGames } from '../actions/games';

export const getGames = () => dispatch =>
    request('get', 'temporary/games')
        .then(({ body }) => dispatch(receiveGames(body)))
        .catch(err => console.log(err));
