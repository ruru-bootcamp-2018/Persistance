
import io from 'socket.io-client'
// const socket = io('http://localhost:8000')

const socket = io('http://192.168.1.15:8000')

export default function socketReducer (state = socket, action) {
  return state
}