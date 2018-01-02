'use strict'

const express = require('express')
const curriculumCtrl = require('../controllers/curriculum')
const departmentCtrl = require('../controllers/department')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/curriculum', auth, curriculumCtrl.GetAll)
api.post('/curriculum', auth, curriculumCtrl.Insert)
api.put('/curriculum', auth, curriculumCtrl.Update)
api.delete('/curriculum', auth, curriculumCtrl.Delete)

api.get('/department', auth, departmentCtrl.GetAll)
api.post('/department', auth, departmentCtrl.Insert)
api.put('/department', auth, departmentCtrl.Update)
api.delete('/department', auth, departmentCtrl.Delete)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Token active!' })
})

module.exports = api
