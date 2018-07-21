
const initialState =  {
    id:1, mission_id:1, leader_id:1, round_num:1
}
  
  export default function currentRound(state = initialState, action) {
      switch(action.type) {
          case 'UPDATE_ROUND':
              return action.currentRound
          default:
              return state; 
      }
  }