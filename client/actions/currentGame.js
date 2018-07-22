import request from '../utils/api'


export function updateCurrentGame (currentGame) {
    return {
        type: 'UPDATE_GAME',
        currentGame
    }
}

export function updateCurrentRound (currentRound) {    
    return {
        type: 'UPDATE_ROUND',
        currentRound
    }
}

export function updateCurrentMission (currentMission) {
    return {
        type: 'UPDATE_MISSION',
        currentMission
    }
}

export function updateMissionParams (missionParams) {
    return {
        type: 'GET_PARAMS',
        missionParams
    }
}

export function getGameState() {    
    return (dispatch) => {
        request('get', `game/current`) 
        .then((res) => {            
            dispatch(updateCurrentRound(res.body.currentRound))
            dispatch(updateCurrentMission(res.body.currentMission))
            dispatch(updateMissionParams(res.body.missionParams))
            dispatch(updateCurrentGame(res.body.currentGame))
        })
        .catch(err =>{
            console.log('Err', err.message)
        })
    }
    
}

// export function getCurrentGame() {
//     return (dispatch) => {
//         return request('get', `temporary/currentGame`) 
//         .then((res) => {
//             dispatch(updateCurrentGame(res.body))
//         })
//         .catch(err =>{
//             console.log('Err in actions/games.js', err.message)
//         })
//     }
// } 