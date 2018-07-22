import request from '../utils/api'

export function sendNomination(data){
  request('post', 'game/nominate', data)
    .then(() => {
      console.log('Nomed')
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}

export function sendVote(data){
  request('post', 'game/vote', data)
    .then(() => {
      console.log('voted')
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}

export function joinGame(data){
  request('post', 'game/join', data)
    .then(() => {
      console.log('joined')
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}

export function sendIntention(data){
  request('post', 'game/intention', data)
    .then(() => {
      console.log('intented')
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}

export function startGame(data){
  request('post', 'game/start', data)
    .then(() => {
      console.log('started')
    })
    .catch(err => {
      console.log('Error', err.message)
    })
}