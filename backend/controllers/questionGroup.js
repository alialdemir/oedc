'use strict'

const Model = require('../models/questionGroup')
const Question = require('../models/question')
var ObjectId = require('mongodb').ObjectID;

function GetAll(req, res) {
  let query = JSON.parse(req.query.Query) || {}
  let pageSize = Number.parseInt(req.query.PageSize)
  let pageNumber = Number.parseInt(req.query.PageNumber)
  let fields = {}
  if (req.query.Fields !== undefined || req.query.Fields !== '') fields = req.query.Fields
  if (pageSize === NaN) pageSize = 10;
  if (pageNumber === NaN || pageNumber <= 0) pageNumber = 1;

  Model.paginate(query, { select: fields, sort: { order: 1 }, offset: pageSize * (pageNumber - 1), limit: pageSize })
    .then(function (result) {
      res.status(200)
        .send({
          total_count: result.total,
          pageSize: result.limit,
          pageNumber: result.pages,
          items: result.docs
        })
    })
    .catch(function (err) {
      if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    });
}

function findById(id, res, message) {
  Model.findById(id, function (err, model) {
    res.status(200).send({ message: message, model: model })
  }).select('_id order title description stylishType isRequired questions')
}

function Insert(req, res) {
  Model.findOne({}, {}, { sort: { order: -1 } }, function (err, post) {

    let model = new Model()
    model.title = req.body.title
    model.description = req.body.description
    model.stylishType = req.body.stylishType
    model.isRequired = req.body.isRequired
    if (post) model.order = post.order + 1
    else model.order = 1

    model.save((err, newModel) => {
      if (err) res.status(500).send({ message: `Veritabanında kaydedilirken hata oluştu: ${err} ` })

      findById(newModel._id, res, newModel.title + ' isimli soru grubu eklendi.')
    })
  });
}

function Update(req, res) {
  Model.findById(req.body._id, (err, model) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!model) return res.status(404).send({ message: `Soru grubu mevcut değil.` })
    model.title = req.body.title || model.title
    model.description = req.body.description || model.description
    model.stylishType = req.body.stylishType || model.stylishType
    if (req.body.isRequired !== undefined) model.isRequired = req.body.isRequired
    model.order = req.body.order || model.order

    model.save((err) => {
      if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })

      findById(model._id, res, model.title + ' isimli soru grubu güncellendi.')
    });
  });
}

function Delete(req, res) {
  Model.findByIdAndRemove(req.query._id, (err, model) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!model) return res.status(404).send({ message: `Soru grubu mevcut değil.` })
    model.remove();
    res.status(200).send({ message: model.title + ' isimli soru grubu silindi.' });
  });
}

module.exports = {
  GetAll,
  Insert,
  Update,
  Delete
}
