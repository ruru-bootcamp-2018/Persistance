import request from '../utils/api'

export function receiveGames(games){
    return {
        type: 'RECEIVE_GAMES',
        games
    }
}

export function addGame(game){
    return {
        type: 'ADD_GAME',
        game
    }
}

export function joinGame(game){
    return {
        type: 'JOIN_GAME',
        game
    }
}

export function leaveGame(game){
    return {
        type: 'LEAVE_GAME',
        game
    }
}

export function getGames() {
    return (dispatch) => {
        return request('get', `temporary/games`) 
        .then((res) => {
            dispatch(receiveGames(res.body))
        })
        .catch(err =>{
            console.log('Err in actions/games.js', err.message)
        })
    }
} 

export function createGame (name) {
    return (dispatch) => {
        return request('post', `temporary/games`)
      .send({name})
      .catch(err =>{
        console.log('Err cant create game, sorry about it')
    })
    }
  }
