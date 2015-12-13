const express = require('express')
const app = express()

app.use(express.static(__dirname + '/files'))
app.use(express.static(__dirname + '/bower_components'))

app.listen(1337, function () {
    console.log("Example ready on http://localhost:1337")
})
