const express = require('express')
const hbs = require('express-handlebars')
const server = express()
const fs = require('fs')

const serverRoutes = require('./routes')

//Server config
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

//Handlebars config
server.engine('hbs', hbs.engine({ extname: 'hbs' })) //This line is breaking everything
server.set('view engine', 'hbs')

//Middleware
server.use('/poshPeople', serverRoutes)

//Test set up to check it is running
server.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
    res.render('home', JSON.parse(data))
  })
})

module.exports = server