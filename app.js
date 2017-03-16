// import express and utility tools
var utility = require('utility')
var express = require('express')
  , girlsPic = require('./request/girlsPic')
  , girlsCover = require('./parser/girlsCover')
  , girlsImgEach = require('./parser/girlsImgEach')


// initialize express instance
var app = express()

app.get('/girls/tag/:id', girlsPic.coverRequest, girlsCover.parse)

app.get('/girls', girlsPic.reqImgEachPage, girlsImgEach.parsePageImg)

//app.get('/showall/girlsPic', )

app.listen(3000, function (req, res) {
	console.log('app is running on http://localhost:3000')
})
