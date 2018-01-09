'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const ModelSchema = Schema({
    question: String,
    questionGroup: { type: Schema.Types.ObjectId, ref: 'QuestionGroup' },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
})

ModelSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Question', ModelSchema)
