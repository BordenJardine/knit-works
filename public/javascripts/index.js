let id = null
let currentId = null

function load() {
  console.log('hello world')
  button = document.querySelector('button')
  ws = startWebSockets()
  button.addEventListener('click', () => onClick(ws))
}

function startWebSockets() {
  const ws = new WebSocket("ws://" + window.location.host)
  ws.onmessage = onMessage
  id = Date.now();
  return ws
}

function onMessage(e) {
  if (parseInt(e.data)) {
    currentId = e.data
    console.log(currentId)
    disableIfCurrent()
  } else {
    console.log("Skipped")
  }

  // console.debug("WebSocket message received:", e)
}

function onClick(ws) {
  console.log('sending socket message')
  // ws.send('clicked!')
  ws.send(id)
}

function disableIfCurrent() {
  button = document.querySelector('button')
  if (id == currentId) {
    button.disabled = true
  } else {
    button.disabled = false
  }
}

window.addEventListener('load', load)
