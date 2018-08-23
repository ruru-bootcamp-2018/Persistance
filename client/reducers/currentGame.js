export const initialState = {
    game: {},
    players: [],
    missions: [],    
    gameStage: "",
    currentMission: {},
    currentRound: {}   

}



export default function currentGame(state = initialState, action) {
    switch(action.type) {
        case 'UPDATE_GAME':
            return action.currentGame
        case 'RESET_GAME':
            return initialState
        default:
            return state; 
    }
}
