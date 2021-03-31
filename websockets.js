WebSocket = require('ws')

let currentId = null

exports.startWebSockets = function(server) {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log('received: %s', message)
      checkId(message)
      currentId = message
      sendCurrentId(wss)
    })
    ws.send('web socket connection started')
  })
  // startIntervalTest(wss)
}

// sends a useless message to all connected clients
// every 5 seconds
function startIntervalTest(wss) {
  let i = 0
  let interval = 5000
  setInterval(() => sendIntervalMessage(wss, i++), interval)
}

function sendIntervalMessage(wss, i) {
  wss.clients.forEach(client => {
    if (client.readyState != WebSocket.OPEN) return
    client.send(`message #${i}: see you in 5000 milliseconds`)
  })
}

function checkId(id) {
  console.log(id==currentId ? "NO" : "YES")
}

function sendCurrentId(wss) {
  wss.clients.forEach(client => {
    if (client.readyState != WebSocket.OPEN) return
    client.send(currentId)
  })
}
