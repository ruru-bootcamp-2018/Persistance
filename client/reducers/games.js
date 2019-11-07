export const initialState = [
    //just the games that are not started or finished
    {
        id: 1,
        is_finished: false,
        in_progress: false,
        timestamp: 63465475684,
        game_name: "PLAGUE'S GAME",
        host_id: 7,
    },
    {
        id: 2,
        is_finished: false,
        in_progress: false,
        timestamp: 83745767386,
        game_name: "PLAGUE'S OTHER GAME",
        host_id: 5,
    },
    {
        id: 3,
        is_finished: false,
        in_progress: false,
        timestamp: 33546476876,
        game_name: "PLAGUE'S OTHER OTHER GAME",
        host_id: 3,
    },
];

export default function games(state = initialState, action) {
    switch (action.type) {
        case 'RECEIVE_GAMES':
            return action.games;
        case 'ADD_GAME':
            return [...state, action.game];
        default:
            return state;
    }
}
