const router = require('express').Router()
let Exercise = require('../models/exercise')
let User = require('../models/user')

router.route('/log').get(async (req, res) => {

    try {

    // get query parameter
    const getUserId = req.query.userId
    const getFromDate = req.query.from ? new Date(req.query.from) : false
    const getToDate = req.query.to ? new Date(req.query.to) : false
    const getLimit = Number(req.query.limit) 


    if(getUserId) {
        const findUser = await User.findOne({_id: getUserId})

        let exerciseQuery = {
            userId: getUserId,
            date: {
                $gte: getFromDate,
                $lte: getToDate
            }
        }
        exerciseQuery.date.$gte === false && delete exerciseQuery.date.$gte
        exerciseQuery.date.$lte === false && delete exerciseQuery.date.$lte
        !exerciseQuery.date.hasOwnProperty('$gte') && !exerciseQuery.date.hasOwnProperty('$lte') && delete exerciseQuery.date

    

        const findExercise = await Exercise.find(exerciseQuery, {description: 1, duration: 1, date: 1, _id: 0}).limit(getLimit).sort({date: 1})
        const response = {
            _id: findUser._id,
            username: findUser.username,
            count: findExercise.length,
            log: findExercise
        }


        res.json(response)
        console.log(exerciseQuery)

    } else {
        res.status(400).json(`Cannot find the userId`)
    }
    
        
    } catch (error) {
        console.error(error)
        res.status(500).json('Server error...')
    }

})



module.exports = router