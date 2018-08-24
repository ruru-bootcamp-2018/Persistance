
const initialState = [
    {
        "id": 91,
        "players_total": 5,
        "team_total": 2,
        "mission_num": 1,
        "fails_needed": 1
    },
    {
        "id": 92,
        "players_total": 5,
        "team_total": 3,
        "mission_num": 2,
        "fails_needed": 1
    },
    {
        "id": 93,
        "players_total": 5,
        "team_total": 2,
        "mission_num": 3,
        "fails_needed": 1
    },
    {
        "id": 94,
        "players_total": 5,
        "team_total": 3,
        "mission_num": 4,
        "fails_needed": 1
    },
    {
        "id": 95,
        "players_total": 5,
        "team_total": 3,
        "mission_num": 5,
        "fails_needed": 1
    }
]

export default function missionParams(state = initialState, action) {
    switch(action.type) {
        case 'GET_PARAMS':
            return action.missionParams
        case 'RESET_GAME':
            return initialState
        default:
            return state; 
    }
}