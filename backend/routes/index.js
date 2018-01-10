'use strict'

const express = require('express')
const curriculumCtrl = require('../controllers/curriculum')
const departmentCtrl = require('../controllers/department')
const lessonCtrl = require('../controllers/lesson')
const instructorCtrl = require('../controllers/instructor')
const questionGroupCtrl = require('../controllers/questionGroup')
const questionCtrl = require('../controllers/question')
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

api.get('/instructor', auth, instructorCtrl.GetAll)
api.get('/instructor/lesson', auth, instructorCtrl.GetInstructorLessonInfo)
api.post('/instructor', auth, instructorCtrl.Insert)
api.put('/instructor', auth, instructorCtrl.Update)
api.delete('/instructor', auth, instructorCtrl.Delete)

api.get('/questiongroup', auth, questionGroupCtrl.GetAll)
api.post('/questiongroup', auth, questionGroupCtrl.Insert)
api.put('/questiongroup', auth, questionGroupCtrl.Update)
api.delete('/questiongroup', auth, questionGroupCtrl.Delete)

api.get('/question', auth, questionCtrl.GetAll)
api.get('/question/lesson', auth, questionCtrl.GetQuestionLessonInfo)
api.post('/question', auth, questionCtrl.Insert)
api.put('/question', auth, questionCtrl.Update)
api.delete('/question', auth, questionCtrl.Delete)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

module.exports = api
