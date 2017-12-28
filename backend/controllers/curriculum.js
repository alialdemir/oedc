'use strict'

const Curriculum = require('../models/curriculum')

function getCurriculum(req, res) {
  let curriculumId = req.params.curriculumId

  Curriculum.findById(curriculumId, (err, curriculum) => {
    if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    if (!curriculum) return res.status(404).send({ message: `Bölüm mevcut değil.` })

    res.status(200).send({ curriculum })
  })
}

module.exports = {
  getCurriculum
}
