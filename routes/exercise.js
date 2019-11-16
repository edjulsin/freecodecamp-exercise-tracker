const router = require('express').Router()
let Exercise = require('../models/exercise')
let User = require('../models/user')


router.route('/add').post(async function (req, res) {
  
  try {

    const getExercise = req.body
    const userId = getExercise.userId
    const description = getExercise.description
    const duration = getExercise.duration
    const date = getExercise.date ? new Date(getExercise.date).toDateString() : new Date().toDateString()
  
    const newExercise = new Exercise ({
      userId,
      description,
      duration,
      date
    })

     // check if user already have an account
    const findUser = await User.findOne({'_id': userId})

    if(findUser) {
      let savedExercise = await newExercise.save()
      const mergeObject = {
        username: findUser.username,
        description: description,
        duration: duration,
        _id: userId,
        date: date
      }

      res.json(mergeObject)
      
    } else {
      res.status(400).json('User not found')
    }    
    
  } catch (error) {
    console.error(error)
    res.status(500).json('Server error...')
  } 
})



module.exports = router