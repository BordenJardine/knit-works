const session = require('express-session')
const cookie = require('cookie')
const cookieParser = require('cookie-parser')

// in-memory session information
// this belongs in a database eventually
const SESSION_STORE = {}
const SECRET = 'moonlight4life'

function setup(app) {
  app.use(
    session({
      secret: SECRET,
      saveUninitialized: true,
      resave: false,
    })
  )

  // on all requests:
  // if the session doesn't have a name
  // go ask the user for one
  app.use((req, res, next) => {
    const name = find(req.session.id)?.name || ''
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
  return SESSION_STORE[sessionId]
}

// add stuff to the session
function update(sessionId, newStuff = {}) {
  const existingStuff = SESSION_STORE[sessionId] || {}
  SESSION_STORE[sessionId] = { ...existingStuff, ...newStuff }
}

function findByCookie(cookies) {
  sessionCookie = cookie.parse(cookies)['connect.sid']
  return find(cookieParser.signedCookie(sessionCookie, SECRET))
}

// make these functions available to other modules
module.exports = {
  setup,
  find,
  findByCookie,
  update,
  SECRET
}

