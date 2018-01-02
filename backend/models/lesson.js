'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const ModelSchema = Schema({
    name: String,
    code: String,
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    period: Periods,
    isActive: Boolean,
})

ModelSchema.plugin(mongoosePaginate);

const Periods = {
    Autumn = 1,
    Spring = 2
}

module.exports = mongoose.model('Lesson', ModelSchema)
