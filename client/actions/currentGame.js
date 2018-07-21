import request from 'superagent'

export function receiveCurrentGame (currentGame) {
    return {
        type: 'RECEIVE_GAME',
        currentGame
    }
}

export function getCurrentGame() {
    return (dispatch) => {
        return request('get', `temporary/currentGame`) 
        .then((res) => {
            dispatch(receiveCurrentGame(res.body))
        })
        .catch(err =>{
            console.log('Err in actions/games.js', err.message)
        })
    }
} 