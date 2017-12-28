'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CurriculumSchema = Schema({
  name: String,
  isActive: Boolean,
})

module.exports = mongoose.model('Curriculum', CurriculumSchema)
