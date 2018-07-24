
import io from 'socket.io-client'
const socket = io(window.location.href) //maybe change to localhost:8000

export default function socketReducer (state = socket, action) {
  return state
}
