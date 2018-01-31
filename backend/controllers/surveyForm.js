'use strict'

const Model = require('../models/surveyForm')
var moment = require('moment');

function GetAll(req, res) {
  let query = JSON.parse(req.query.Query) || {}
  let pageSize = Number.parseInt(req.query.PageSize)
  let pageNumber = Number.parseInt(req.query.PageNumber)
  let fields = {}
  if (req.query.Fields !== undefined || req.query.Fields !== '') fields = req.query.Fields
  if (pageSize === NaN) pageSize = 10;
  if (pageNumber === NaN || pageNumber <= 0) pageNumber = 1;

  Model.paginate(query, { select: fields, sort: { finishDate: -1 }, offset: pageSize * (pageNumber - 1), limit: pageSize })
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
  }).select('_id startDate finishDate period')
}

function Insert(req, res) {
  let model = new Model()
  model.startDate = new Date(req.body.startDate).toUTCString()
  model.finishDate = new Date(req.body.finishDate).toUTCString()
  model.period = req.body.period

  model.save((err, newModel) => {
    if (err) res.status(500).send({ message: `Veritabanında kaydedilirken hata oluştu: ${err} ` })

    findById(newModel._id, res, ' Anket oluşturuldu.')
  })
}

function Update(req, res) {
  Model.findById(req.body._id, (err, model) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!model) return res.status(404).send({ message: `Anket mevcut değil.` })

    model.startDate = new Date(req.body.startDate).toUTCString() || model.startDate
    model.finishDate = new Date(req.body.finishDate).toUTCString() || model.finishDate
    model.period = req.body.period || model.period

    model.save((err) => {
      if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })

      findById(model._id, res, 'Anket güncellendi.')
    });
  });
}

function Delete(req, res) {
  Model.findByIdAndRemove(req.query._id, (err, model) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!model) return res.status(404).send({ message: `Anket mevcut değil.` })
    model.remove();
    res.status(200).send({ message: 'Anket silindi.' });
  });
}

function SurveyList(req, res) {
  const surveyFormId = req.params.id;
  const now = moment();
  console.log(now.toISOString());
  Model.find({
    $and: [
      // { startDate: { $gte: '2018-01-19T14:55:50.000Z' } },
      { finishDate: { $lt: ISODate("2013-11-19T20:00:00Z") } },
    ]
  }).then(resolve => {
    res.status(200).send({ message: resolve });
  });
}


module.exports = {
  GetAll,
  Insert,
  Update,
  Delete,
  SurveyList,
}
