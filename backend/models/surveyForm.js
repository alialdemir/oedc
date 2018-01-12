'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const ModelSchema = Schema({
    startDate: {
        type: Date,
        default: new Date()
    },
    finishDate: {
        type: Date,
        default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000), // Date in one week from now
    },
    period: { type: String, enum: ['Güz', 'Bahar'] },
})

ModelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('SurveyForm', ModelSchema)
