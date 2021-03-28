const http = require('http')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const createError = require('http-errors')
const express = require('express')

const startWebSockets = require('./websockets.js').startWebSockets

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8080

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

app.get('/', ( req, res ) => {
  res.send('Knitting is super cool! 🧶')
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

startWebSockets(server)

server.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
});

module.exports = app
