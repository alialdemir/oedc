'use strict'

const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const ModelSchema = Schema({
  name: String,
  isActive: Boolean,
})

ModelSchema.pre('remove', function (next) {
  this.model('Department').remove({ curriculum: this._id }, next);
});

ModelSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Curriculum', ModelSchema)
