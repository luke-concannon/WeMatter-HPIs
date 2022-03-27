const express = require('express')
const router = express.Router()
const portalData = './portal.json'
const fs = require('fs')
const { post } = require('superagent')



//Declare routes

router.post('/', (req, res) => {
  

  fs.readFile(portalData, 'utf-8', (err, data) => {
    let userName = req.body.username
    let passWord = req.body.password
    let parsedData = JSON.parse(data)
    let user = parsedData.users.find(user => user.username === userName)
    console.log(user)
    if(user && passWord === user.password){
    res.render('details', user)
    } else {
      res.send('wrong details!')
    }
  })
})

module.exports = router