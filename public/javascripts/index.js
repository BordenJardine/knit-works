let currentName = null
let myName = null

function load() {
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
  const data = JSON.parse(e.data)
  switch (data.type) {
    case'init':
      myName = data.name
      document.querySelector('#urName').innerHTML = `, ${myName}`
      break
    case 'click':
      currentName = data.name
      document.querySelector('#clicker').innerHTML = ` ${currentName}`
      disableIfCurrent()
      break
    default:
      console.debug("WebSocket message received:", e)
  }
}

function onClick(ws) {
  ws.send('click!')
}

function disableIfCurrent() {
  button = document.querySelector('button')
  button.disabled = myName == currentName
}

window.addEventListener('load', load)
