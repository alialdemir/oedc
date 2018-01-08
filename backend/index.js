'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config/config')

mongoose.connect(config.db, {useMongoClient: true}, (err, res) => {
  if (err) {
    return console.log(`Failure to connect to database: ${err}`)
  }
  console.log('Connected database...')

  app.listen(config.port, () => {
    console.log(`REST API runing on http://localhost:${config.port}`)
  })
})
