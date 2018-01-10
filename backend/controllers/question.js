'use strict'

const Model = require('../models/question')
const QuestionGroup = require('../models/questionGroup')

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
  }).select('_id question lessons questionGroup')
}

function Insert(req, res) {
  let model = new Model()
  model.question = req.body.question
  model.questionGroup = req.body.questionGroup
  model.lessons = req.body.lessons

  model.save((err, newModel) => {
    if (err) res.status(500).send({ message: `Veritabanında kaydedilirken hata oluştu: ${err} ` })

    AddedQuestionGroup(req, res, newModel._id);
  })
}

function AddedQuestionGroup(req, res, questionId) {
  QuestionGroup.findById(req.body.questionGroup, (err, model1) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!model1) return res.status(404).send({ message: `Soru grubu mevcut değil.` })

    model1.questions.push(questionId);

    model1.save((err) => {
      if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })

      findById(questionId, res, 'Soru eklendi.')
    });
  });
}

function RemovedQuestionGroup(req, res, questionId, questionGroupId) {
  QuestionGroup.update({ _id: questionGroupId }, { $pullAll: { questions: [questionId] } }, function (err, raw) {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })

    res.status(200).send({ message: 'Soru silindi.' });
  })
}

function Update(req, res) {
  Model.findById(req.body._id, (err, model) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!model) return res.status(404).send({ message: `Soru mevcut değil.` })

    model.question = req.body.question || model.question
    model.questionGroup = req.body.questionGroup || model.questionGroup
    model.lessons = req.body.lessons || model.lessons

    model.save((err) => {
      if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })

      findById(model._id, res, 'Soru güncellendi.')
    });
  });
}

function Delete(req, res) {
  Model.findByIdAndRemove(req.query._id, (err, model) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!model) return res.status(404).send({ message: `Soru mevcut değil.` })
    model.remove();

    RemovedQuestionGroup(req, res, req.query._id, model.questionGroup);
  });
}

module.exports = {
  GetAll,
  Insert,
  Update,
  Delete
}
