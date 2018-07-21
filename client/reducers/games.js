export const initialState = [] //{"id":1,"is_finished":0,"in_progress":1,"time_stamp":1532038586180,"game_name":"test game"}]; //mebbe put in []


export default function games(state = initialState, action) {
    console.log('Games reducer in action', action)
    switch(action.type) {
        case 'RECEIVE_GAME':
            return action.game
        default:
            return state; 
    }
}
