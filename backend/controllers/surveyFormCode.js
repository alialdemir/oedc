'use strict'

const Model = require('../models/surveyFormCodes')

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

function Insert(req, res) {
    let model = new Model()
    model.name = req.body.name
    model.isActive = req.body.isActive

    model.save((err, newModel) => {
        if (err) res.status(500).send({ message: `Veritabanında kaydedilirken hata oluştu: ${err} ` })

        res.status(200).send('Ok')
    })
}
module.exports = {
    GetAll,
    Insert
}
