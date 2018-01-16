'use strict'

const User = require('../models/user')
const service = require('../services')
const bcrypt = require('bcrypt-nodejs')

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn(req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) return res.status(401).send({ message: 'Bir hata oluştu!', err });
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).send({ message: 'Giriş işlemi başarısız. Kullanıcı adı veya eposta yanlış.' });
    }
    return res.status(200).send({
      message: 'Giriş işlemi başarılı!',
      token_type: 'bearer',
      token: service.createToken(user)
    });
  });
}

module.exports = {
  signUp,
  signIn
}
