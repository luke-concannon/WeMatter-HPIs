const express = require('express')
const hbs = require('express-handlebars')
const server = express()
const fs = require('fs')

const serverRoutes = require('./routes')

//Server config
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

//Handlebars config
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

//Middleware
server.use('/', serverRoutes)

//Test set up to check it is running
server.get('/', (req, res) => {
  fs.readFile('./portal.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    res.render('home', parsedData)
  })
})

module.exports = server