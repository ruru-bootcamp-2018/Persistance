export const initialState = {
    rounds: [],
  }
  

  export default function rounds (state = initialState, action) {
    switch (action.type) {
      case "ADD_MEETING":
      return {
        ...state,
        rounds: [...state.rounds, action.round],
      }
      case "ERROR" :
      console.log(action.err)
      return {
        ...state,
      }
      default:
      return state
    }
  }