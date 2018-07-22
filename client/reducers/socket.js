
import io from 'socket.io-client'
const socket = io('http://localhost:8000')

export default function socketReducer (state = socket, action) {
  return state
}