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


module.exports = server