'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const ModelSchema = Schema({
    title: String,
    description: String,
    stylishType: { type: String, enum: ['Derecelendirme', 'Yüzdesel', 'Açık Uçlu'] },
    isRequired: Boolean,
    order: Number,
})

ModelSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('QuestionGroup', ModelSchema)
