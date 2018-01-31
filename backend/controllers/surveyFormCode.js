'use strict'

const Model = require('../models/surveyFormCode')

function GetAll(req, res) {
    let query = JSON.parse(req.query.Query) || {}
    let pageSize = Number.parseInt(req.query.PageSize)
    let pageNumber = Number.parseInt(req.query.PageNumber)
    let fields = {}
    if (req.query.Fields !== undefined || req.query.Fields !== '') fields = req.query.Fields
    if (pageSize === NaN) pageSize = 10;
    if (pageNumber === NaN || pageNumber <= 0) pageNumber = 1;

    Model.paginate(query, {
        populate: [
            {
                path: 'lessonId',
                select: '-_id name',
                populate: { path: 'department', select: '-_id name' }
            },
            { path: 'instructorId', select: '-_id fullname' }
        ], select: fields, sort: { _id: -1 }, offset: pageSize * (pageNumber - 1), limit: pageSize
    }).then(function (result) {
        return res.status(200)
            .send({
                total_count: result.total,
                pageSize: result.limit,
                pageNumber: result.pages,
                items: result.docs
            })
    }).catch(function (err) {
        if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
    });
}

function Insert(req, res) {
    let model = new Model()
    model.lessonId = req.body.lessonId
    model.surveyFormId = req.body.surveyFormId
    model.instructorId = req.body.instructorId
    model.branch = req.body.branch
    model.isShow = req.body.isShow

    model.save((err, newModel) => {
        if (err) res.status(500).send({ message: `Veritabanında kaydedilirken hata oluştu: ${err} ` })

        return res.status(200).send('Ok')
    })
}

function Update(req, res) {
    Model.findById(req.body._id, (err, model) => {
        if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
        if (!model) return res.status(404).send({ message: `Anket kodu mevcut değil.` })

        if (req.body.isShow !== undefined) model.isShow = req.body.isShow

        model.save((err) => {
            if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })

            return res.status(200).send({ message: model.isShow ? 'Anket aktif edildi.' : 'Anket pasif yapıldı.' })
        });
    });
}


module.exports = {
    GetAll,
    Insert,
    Update,
}
