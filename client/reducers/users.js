export const initialState = [];

export default function players(state = initialState, action) {
    switch (action.type) {
        case 'RECEIVE_PLAYERS':
            return action.players;
        default:
            return state;
    }
}
