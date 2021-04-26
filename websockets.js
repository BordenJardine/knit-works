WebSocket = require('ws')
const session = require('./session.js')

// name of the user who most recently clicked the button
let currentClicker = null

exports.startWebSockets = function(server) {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (ws, req, client) => {
    const userSession = session.findByCookie(req.headers.cookie)
    ws.on('message', message => {
      console.log('received: %s', message)
      // the user clicked the button!
      currentClicker = userSession.name
      sendCurrentClicker(wss)
    })
    // tell the user their name
    ws.send(JSON.stringify({ type: 'init', name: userSession.name }))
  })
  //startUpdatingClients(wss)
}

// tell the clients who is currently connected
// every 5 seconds
function startUpdatingClients(wss) {
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

function sendCurrentClicker(wss) {
  wss.clients.forEach(client => {
    if (client.readyState != WebSocket.OPEN) return
    client.send(JSON.stringify({type: 'click', name: currentClicker}))
  })
}
