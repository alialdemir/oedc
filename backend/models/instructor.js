'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const ModelSchema = Schema({
    fullname: String,
    isActive: Boolean,
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
})

ModelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Instructor', ModelSchema)
