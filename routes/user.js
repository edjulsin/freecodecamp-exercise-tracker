const router = require('express').Router()
let User = require('../models/user')

router.route('/users').get((req, res) => {
  User.find({}, {'_id': 1, 'username': 1})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('err: ' + err))
})

router.route('/new-user').post((req, res) => {
  const username = req.body.username
  const newUser = new User({username})
 
  newUser.save()
    .then(newUser => res.json({username: newUser.username,_id: newUser._id}))
    .catch(err => res.status(400).json('Username already taken'))
})



module.exports = router