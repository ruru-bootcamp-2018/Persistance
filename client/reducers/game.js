export const initialState = [];

export default function games(state = initialState, action) {
    switch (action.type) {
        case 'JOIN_GAME':
            return action.game;
        case 'LEAVE_GAME':
            return null;
        default:
            return state;
    }
}
