export const initialState = {
    game: { id: 4, is_finished: false, is_progress: true, timestamp: 6968856873, game_name: "THE BEST GAME OF ALL", host_id: 7 },
    players: [
        { id: 1, user_name: "Rebdug", display_name: "REBDUG", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iSlmFxI9FloA5xjYfwoujNED7PICOMCwGrBspLI2HnRSKChi", game_id: 4, role: "spy" },
        { id: 7, user_name: "Cate", display_name: "Plague the Great and Powerful", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iSlmFxI9FloA5xjYfwoujNED7PICOMCwGrBspLI2HnRSKChi", game_id: 4, role: "spy" },
        { id: 3, user_name: "Dannash100", display_name: "DANNASH100", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iSlmFxI9FloA5xjYfwoujNED7PICOMCwGrBspLI2HnRSKChi", game_id: 4, role: "good" },
        { id: 4, user_name: "maddog", display_name: "MAD DOG PINFOLD", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iSlmFxI9FloA5xjYfwoujNED7PICOMCwGrBspLI2HnRSKChi", game_id: 4, role: "good" },
        { id: 5, user_name: "phoenix", display_name: "Phoenix", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iSlmFxI9FloA5xjYfwoujNED7PICOMCwGrBspLI2HnRSKChi", game_id: 4, role: "good" }
    ],
    missions: [
        //round one ends
        {
            id: 2, game_id: 4, outcome: true, rounds: [
                {
                    id: 1, mission_id: 1, leader_id: 1, round_num: 1,
                    nominations: [{ round_id: 1, user_id: 3 },
                    { round_id: 1, user_id: 1 }], //nominated player => user_id
                    votes: [{ round_id: 1, user_id: 1, vote: true },
                    { round_id: 1, user_id: 7, vote: true },
                    { round_id: 1, user_id: 3, vote: true },
                    { round_id: 1, user_id: 4, vote: false },
                    { round_id: 1, user_id: 5, vote: false }],//vote caster => user_id
                }],
            intentions: [{ mission_id: 1, user_id: 1, intention: false },
                    { mission_id: 1, user_id: 3, intention: true }]     
        }],
    
        gameStage: "voting"

}



export default function currentGame(state = initialState, action) {
    switch(action.type) {
        case 'UPDATE_GAME':
            return action.currentGame
        default:
            return state; 
    }
}
