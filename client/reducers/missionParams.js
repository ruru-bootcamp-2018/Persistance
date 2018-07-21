
const initialState = {players_total:5, team_total:2, mission_num:1, fails_needed:1 }

export default function missionParams(state = initialState, action) {
    switch(action.type) {
        case 'GET_PARAMS':
            return action.missionParams
        default:
            return state; 
    }
}