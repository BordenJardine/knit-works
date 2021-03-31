function load() {
  console.log('hello world')
  button = document.querySelector('button')
  ws = startWebSockets()
  button.addEventListener('click', () => onClick(ws))
}

function startWebSockets() {
  const ws = new WebSocket("ws://" + window.location.host)
  ws.onmessage = onMessage
  return ws
}

function onMessage(e) {
  console.debug("WebSocket message received:", e)
}

function onClick(ws) {
  console.log('sending socket message')
  ws.send('clicked!')
}

window.addEventListener('load', load)

