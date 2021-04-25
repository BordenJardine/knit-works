const path = require('path')
const router = require('express').Router()
const session = require('./session.js')

// get request means page render
router.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/login.html')
})

//post request means form submission
router.post('/', function(req, res) {
  const name = req.body.name
  console.log('post!!', req.session.id, name)
  session.update(req.session.id, { name })
  res.redirect('/')
})

module.exports = router
