'use strict'

const Model = require('../models/curriculum')

function GetAll(req, res) {
  let query = JSON.parse(req.query.Query) || {}
  let pageSize = Number.parseInt(req.query.PageSize)
  let pageNumber = Number.parseInt(req.query.PageNumber)
  let fields = {}
  if (req.query.Fields !== undefined || req.query.Fields !== '') fields = req.query.Fields
  if (pageSize === NaN) pageSize = 10;
  if (pageNumber === NaN || pageNumber <= 0) pageNumber = 1;

  Model.paginate(query, { select: fields, sort: { _id: -1 }, offset: pageSize * (pageNumber - 1), limit: pageSize })
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
  }).select('_id name isActive')
}

function Insert(req, res) {
  let model = new Model()
  model.name = req.body.name
  model.isActive = req.body.isActive

  model.save((err, newModel) => {
    if (err) res.status(500).send({ message: `Veritabanında kaydedilirken hata oluştu: ${err} ` })

    findById(newModel._id, res, newModel.name + ' isimli bölüm eklendi.')
  })
}

function Update(req, res) {
  Model.findById(req.body._id, (err, model) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!model) return res.status(404).send({ message: `Bölüm mevcut değil.` })

    model.name = req.body.name || model.name
    if (req.body.isActive !== undefined) model.isActive = req.body.isActive

    model.save((err) => {
      if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })

      findById(model._id, res, model.name + ' isimli bölüm güncellendi.')
    });
  });
}

function Delete(req, res) {
  Model.findByIdAndRemove(req.query.curriculumId, (err, model) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!model) return res.status(404).send({ message: `Bölüm mevcut değil.` })
    model.remove();
    res.status(200).send({ message: model.name + ' isimli bölüm silindi.' });
  });
}

module.exports = {
  GetAll,
  Insert,
  Update,
  Delete
}
