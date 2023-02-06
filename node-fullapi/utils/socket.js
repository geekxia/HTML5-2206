const { io } = require('socket.io-client')

const socket = io('ws://localhost:9090')

socket.on('client', msg => {
  console.log('-- socket connection msg', msg)
})

module.exports = socket
