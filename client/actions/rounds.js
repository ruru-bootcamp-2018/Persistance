import request from '../utils/api'

export function addRound(newRound) {
    return {
        type: 'ADD_ROUND',
        round
    }
}

export function postRound(newRound) {
    return(dispatch) => {
      return request('post', 'rounds', newRound)
      .then((res) => {
        dispatch(addRound(res.body))
      })
      .catch(err => {
        dispatch(error(err.message))
      })
    }
  }

