'use strict'

const express = require('express')
const curriculumCtrl = require('../controllers/curriculum')
const departmentCtrl = require('../controllers/department')
const lessonCtrl = require('../controllers/lesson')
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

api.get('/lesson', auth, lessonCtrl.GetAll)
api.post('/lesson', auth, lessonCtrl.Insert)
api.put('/lesson', auth, lessonCtrl.Update)
api.delete('/lesson', auth, lessonCtrl.Delete)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

module.exports = api