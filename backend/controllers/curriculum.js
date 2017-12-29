'use strict'

const Curriculum = require('../models/curriculum')

function getCurriculum(req, res) {
  let pageSize = Number.parseInt(req.query.PageSize)
  let pageNumber = Number.parseInt(req.query.PageNumber)
  if (pageSize === NaN) pageSize = 10;
  if (pageNumber === NaN || pageNumber <= 0) pageNumber = 1;

  Curriculum.paginate({}, { sort: { _id: -1 }, offset: pageSize * (pageNumber - 1), limit: pageSize })
    .then(function (result) {
      res.status(200)
        .send({
          total_count: result.total,
          pageSize: pageSize,
          pageNumber: pageNumber,
          items: result.docs
        })
    })
    .catch(function (err) {
      if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    });
}

function addCurriculum(req, res) {
  let curriculum = new Curriculum()
  curriculum.name = req.body.name
  curriculum.isActive = req.body.isActive

  curriculum.save((err, curriculumStored) => {
    if (err) res.status(500).send({ message: `Veritabanında kaydedilirken hata oluştu: ${err} ` })

    res.status(200).send({ curriculum: curriculumStored, message: curriculum.name + ' isimli bölüm eklendi.' })
  })
}

function updateCurriculum(req, res) {
  let curriculumId = req.body._id
  Curriculum.findById(curriculumId, (err, curriculum) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })

    curriculum.name = req.body.name || curriculum.name;
    if (req.body.isActive !== undefined) curriculum.isActive = req.body.isActive

    curriculum.save((err, curriculum) => {
      if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
      if (!curriculum) return res.status(404).send({ message: `Bölüm mevcut değil.` })

      res.status(200).send({ message: curriculum.name + ' isimli bölüm güncellendi.', curriculum: curriculum });
    });
  });
}

function deleteCurriculum(req, res) {
  let curriculumId = req.query.curriculumId

  Curriculum.findByIdAndRemove(curriculumId, (err, curriculum) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!curriculum) return res.status(404).send({ message: `Bölüm mevcut değil.` })

    res.status(200).send({ message: curriculum.name + ' isimli bölüm silindi.' });
  });
}

module.exports = {
  getCurriculum,
  addCurriculum,
  updateCurriculum,
  deleteCurriculum
}
