var express = require('express');
var app = express();

// Import User Module Containing Functions Related To User Data
var curriculum = require('../models/curriculum.model');

// API Routes
app.get('/', function (req, res) {
	curriculum.GetAll()
		.then((data) => { res.send(data) })
		.catch((err) => { console.log(err) });
});
app.post('/', function (req, res) {
	var data = req.body;
	curriculum.Insert(data, function (err, rows, fields) { res.send('Ok'); });
});


module.exports = app;
