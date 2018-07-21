import request from 'superagent'

export function updateCurrentGame () {
    return {
        type: 'UPDATE_GAME',
        currentGame
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