var cheerio = require('cheerio')

exports.parsePage = function (req, res, next) {
	var $ = cheerio.load(res.locals.htmlBody)
	var reg = /[1-9][0-9]*/g
	var pages = $('.pagebreak1 ul li a').first().text().match(reg)
	res.send(pages)
}

exports.parsePageImg = function (req, res, next) {
	var $ = cheerio.load(res.locals.htmlBody)
	$('#efpBigPic p img').each(function (idx, element) {
		res.locals.downloadQueue.push({
			url: 	$(element).attr('src').trim(),
			name:   $(element).attr('alt').trim(),
		})
	})
	res.send(res.locals.downloadQueue)
}
