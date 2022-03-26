const express = require('express')
const router = express.Router()
const profileData = './data.json'
const fs = require('fs')
const { post } = require('superagent')

//Declare routes

//route: profiles/1 --> lawrence
router.get('/:id/', (req, res) => {
  fs.readFile(profileData, 'utf-8', (err, data) => {
    const id = req.params.id

    if (err) return res.status(500).send(err.message)
    const parsed = JSON.parse(data)
    const profile = parsed.poshPeople.find((posh) => posh.id == id)
    //console.log(profile)

    res.render('details', profile)
  })
})

router.get('/:id/edit', (req, res) => {
  fs.readFile(profileData, 'utf-8', (err, data) => {
    const id = req.params.id

    if (err) return res.status(500).send(err.message)
    const parsed = JSON.parse(data)
    const profile = parsed.poshPeople.find((posh) => posh.id == id)
    //console.log(profile)

    res.render('details', profile)
  })
})

router.post('/:id', (req, res) => {
  let id = req.params.id
  let mail = JSON.stringify(req.body.fanMail)
  console.log(mail)

  fs.readFile(profileData, 'utf-8', (err, data) => {
    let parsed = JSON.parse(data)
    let profile = parsed.poshPeople.find((posh) => posh.id == id)
    profile.fanmail = mail
    parsed.poshPeople[id - 1] = profile

    fs.writeFile(profileData, JSON.stringify(parsed), (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Updated!')
        res.redirect(`/poshPeople/${id}`)
      }
    })
  })
})

module.exports = router