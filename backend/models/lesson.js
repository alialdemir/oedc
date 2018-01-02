'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const ModelSchema = Schema({
    name: String,
    code: String,
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    period: { type: String, enum: ['Güz', 'Bahar'] },
    branch: [{ type: String, enum: ['A', 'B'] }],
    isActive: Boolean,
})

ModelSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Lesson', ModelSchema)
