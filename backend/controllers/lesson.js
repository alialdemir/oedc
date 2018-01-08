'use strict'

const Model = require('../models/lesson')
const departmentModel = require('../models/department')

function GetAll(req, res) {
    let query = JSON.parse(req.query.Query) || {}
    let pageSize = Number.parseInt(req.query.PageSize)
    let pageNumber = Number.parseInt(req.query.PageNumber)
    let fields = {}
    if (req.query.Fields !== undefined || req.query.Fields !== '') fields = req.query.Fields
    if (pageSize === NaN) pageSize = 10;
    if (pageNumber === NaN || pageNumber <= 0) pageNumber = 1;

    Model.paginate(query, {
        populate: {
            path: 'department',
            select: 'name',
            populate: { path: 'curriculum', select: 'name' }
        }, select: fields, sort: { _id: -1 }, offset: pageSize * (pageNumber - 1), limit: pageSize
    }).then(function (result) {
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
    })
        .populate({
            path: 'department',
            select: 'name',
            populate: { path: 'curriculum', select: 'name' }
        })
        .select('_id name isActive code period branch')
}

function Insert(req, res) {
    departmentModel.findById(req.body.department, function (err, department) {
        if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
        if (!department) return res.status(500).send({ message: `Program mevcut değil` })


        let model = new Model()
        model.name = req.body.name
        model.code = req.body.code
        model.period = req.body.period
        model.branch = req.body.branch
        model.isActive = req.body.isActive
        model.department = req.body.department

        model.save((err, newModel) => {
            if (err) res.status(500).send({ message: `Veritabanında kaydedilirken hata oluştu: ${err}` })

            findById(newModel._id, res, newModel.name + ' isimli ders eklendi.')
        })
    })
}

function Update(req, res) {
    Model.findById(req.body._id, (err, model) => {
        if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
        if (!model) return res.status(404).send({ message: `Ders mevcut değil.` })

        model.name = req.body.name || model.name
        model.code = req.body.code || model.code
        model.period = req.body.period || model.period
        model.branch = req.body.branch || model.branch
        model.department = req.body.department || model.department
        if (req.body.isActive !== undefined) model.isActive = req.body.isActive

        model.save((err) => {
            if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })

            findById(model._id, res, model.name + ' isimli ders güncellendi.')
        });
    });
}

function Delete(req, res) {
    Model.findByIdAndRemove(req.query._id, (err, model) => {
        if (err) return res.status(500).send({ message: `İstekte hata oluştu: ${err}` })
        if (!model) return res.status(404).send({ message: `Ders mevcut değil.` })

        res.status(200).send({ message: model.name + ' isimli ders silindi.' });
    });
}

module.exports = {
    GetAll,
    Insert,
    Update,
    Delete
}
