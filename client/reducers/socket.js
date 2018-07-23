
import io from 'socket.io-client'
const socket = io(window.location.href)

export default function socketReducer (state = socket, action) {
  return state
}
