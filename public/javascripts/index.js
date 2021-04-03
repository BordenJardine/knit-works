let id = null
let currentId = null

function load() {
  console.log('hello world')
  id = Date.now();
  button = document.querySelector('button')
  ws = startWebSockets()
  button.addEventListener('click', () => onClick(ws))
}

function startWebSockets() {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  const ws = new WebSocket(protocol + "://" + window.location.host)
  ws.onmessage = onMessage
  return ws
}

function onMessage(e) {
  if (parseInt(e.data)) {
    currentId = e.data
    console.log(`currentId set: ${currentId}`)
    disableIfCurrent()
  } else {
    console.debug("WebSocket message received:", e)
  }
}

function onClick(ws) {
  console.log('sending socket message')
  ws.send(id)
}

function disableIfCurrent() {
  button = document.querySelector('button')
  button.disabled = id == currentId
}

window.addEventListener('load', load)
