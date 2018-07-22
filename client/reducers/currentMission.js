
const initialState = {
  mission_approved: false, mission_num: 1, id:1, game_id: 4, outcome:false, //outcome will be null until mission outcome sent to db and currentmission iterated.
}

export default function currentMission(state = initialState, action) {
    switch(action.type) {
        case 'UPDATE_MISSION':
            return action.currentMission
        default:
            return state; 
    }
}