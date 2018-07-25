
import io from 'socket.io-client'

//On deployment branch, needs: const socket = io(window.location.href)
//On dev/etc, needs: const socket = io('http://localhost:8000')

const url = process.env.ENVIRONMENT == 'production'
  ? window.location.href
  :'http://localhost:8000'

const socket = io(url)

export default function socketReducer (state = socket, action) {
  return state
}
