export const initialState = []

export default function players(state = initialState, action) {
    console.log(action)
    switch(action.type) {
        case 'RECEIVE_PLAYERS':
            return action.players
         default:
             return state
    }
}

