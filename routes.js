const express = require('express')
const router = express.Router()
const portalData = './portal.json'
const fs = require('fs')
const { post } = require('superagent')



//Declare routes
router.get('/', (req, res) => {
  fs.readFile('./portal.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    res.render('home', parsedData)
  })
})

router.post('/', (req, res) => {
  fs.readFile(portalData, 'utf-8', (err, data) => {
    let userName = req.body.username
    let passWord = req.body.password
    let parsedData = JSON.parse(data)
    let user = parsedData.users.find(user => user.username === userName)
    console.log(user)
    if(user && passWord === user.password){
      res.render('details', user) // work on details page
    } else {
        res.render('home', {rpo: {
        failedLogin: true,
        button: "/images/rpo-button.png"
    }}
    )}
      }) // change this to add 'wrong details' message to home page. How to add partial to home on condition?
  
    })

module.exports = router