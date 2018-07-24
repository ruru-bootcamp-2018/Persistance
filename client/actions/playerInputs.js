import request from '../utils/api'

export function sendNomination(data){
  return request('post', 'game/nominate', data)
}

export function sendVote(data){
  return request('post', 'game/vote', data)
}

export function joinGame(data){
  return request('post', 'game/join', data)
}

export function sendIntention(data){
  return request('post', 'game/intention', data)
}

export function startGame(game, socket){
  return request('post', 'game/start', {game})
    .then((res) => {
      const gameData = res.body
      const game_id = game.id
      socket.emit('updateWaitingRoom', gameData, game_id)
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}
