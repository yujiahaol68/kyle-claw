// import express and utility tools
const utility = require('utility');
const express = require('express')
  , girlsPic = require('./request/girlsPic')
  , girlsCover = require('./parser/girlsCover')
  , girlsImgEach = require('./parser/girlsImgEach')
  , bbcArticle = require('./request/articles')
  , essayRules = require('./parser/articleRules')
  , emailService = require('./storage/email/sendEmail')
  , qna = require('./headless/qna');


// initialize express instance
const app = express();

app.get('/girls/tag/:id', girlsPic.coverRequest, girlsCover.parse);

app.get('/girls', girlsPic.reqImgEachPage, girlsImgEach.parsePageImg);

app.get('/bbc-article/get', bbcArticle.reqArticle, essayRules.bbcParser, emailService.sendBBC);

app.get('/qna', qna.getQnAPage);

//app.get('/showall/girlsPic', )

app.listen(3000, function (req, res) {
	console.log('app is running on http://localhost:3000');
});