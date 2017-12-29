'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const CurriculumSchema = Schema({
  name: String,
  isActive: Boolean,
})
CurriculumSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Curriculum', CurriculumSchema)
