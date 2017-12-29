'use strict'

const express = require('express')
const curriculumCtrl = require('../controllers/curriculum')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/curriculum', auth, curriculumCtrl.getCurriculum)
api.post('/curriculum', auth, curriculumCtrl.addCurriculum)
api.put('/curriculum', auth, curriculumCtrl.updateCurriculum)
api.delete('/curriculum', auth, curriculumCtrl.deleteCurriculum)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Token active!' })
})

module.exports = api
