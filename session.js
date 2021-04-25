const session = require('express-session')

// in-memory session information
// this belongs in a database eventually
const sessionStore = {}

function setup(app) {
  app.set('trust proxy', 1)
  app.use(
    session({
      secret: 'moonlight4life',
      saveUninitialized: true,
      resave: false,
    })
  )

  // on all requests:
  // if the session doesn't have a name
  // go ask the user for one
  app.use((req, res, next) => {
    const name = find(req.session.id)?.name || ''
    debugger;
    console.log('check!!', req.session.id, name)
    if (req.originalUrl != '/login' && name == '') {
      res.redirect('/login')
      return
    }
    next()
  })
}

// this function is currently silly, but we will probably
// thank ourselves for abstracting it away
function find(sessionId) {
  return sessionStore[sessionId]
}

// add stuff to the session
function update(sessionId, newStuff = {}) {
  const existingStuff = sessionStore[sessionId] || {}
  sessionStore[sessionId] = { ...existingStuff, ...newStuff }
  debugger;
}

// make these functions available to other modules
module.exports = {
  setup,
  find,
  update
}

