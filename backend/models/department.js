'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const ModelSchema = Schema({
  name: String,
  isActive: Boolean,
  curriculum: { type: Schema.Types.ObjectId, ref: 'Curriculum' }
})

ModelSchema.pre('remove', function (next) {
  this.model('Lesson').remove({ department: this._id }, next);
});

ModelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Department', ModelSchema)
