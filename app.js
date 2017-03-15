// import express and utility tools
var utility = require('utility')
var express = require('express')
  , girlsPic = require('./request/girlsPic')
  , girlsCover = require('./parser/girlsCover')


// initialize express instance
var app = express()

app.get('/girls/tag/:id', girlsPic.coverRequest, girlsCover.parse)

app.listen(3000, function (req, res) {
	console.log('app is running on http://localhost:3000')
})
