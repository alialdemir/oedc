'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const ModelSchema = Schema({
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    surveyFormId: { type: Schema.Types.ObjectId, ref: 'SurveyForm' },
    instructorId: { type: Schema.Types.ObjectId, ref: 'Instructor' },
    branch: String,
    isShow: { type: Schema.Types.Boolean, default: false },
})

ModelSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('SurveyFormCode', ModelSchema)
