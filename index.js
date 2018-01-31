const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'dist')))
    .set('view engine', 'ejs')
    .get('*', (req, res) => res.sendfile('dist/index.html'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))