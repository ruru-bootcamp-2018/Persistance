import request from '../utils/api'

export function sendNomination(data){
  return request('post', 'game/nominate', data)
    .then(() => {
      
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}

export function sendVote(data){
  return request('post', 'game/vote', data)
    .then(() => {
      
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}

export function joinGame(data){
  return request('post', 'game/join', data)
    .then(() => {
      
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}

export function sendIntention(data){
  return request('post', 'game/intention', data)
    .then(() => {
     
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}

export function startGame(data){
  return request('post', 'game/start', data)
    .then(() => {
      
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}