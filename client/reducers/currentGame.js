export const initialState = [] 

export default function currentGame(state = initialState, action) {
    switch(action.type) {
        case 'RECEIVE_GAME':
            return action.currentGame
        default:
            return state; 
    }
}
