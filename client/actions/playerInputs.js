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