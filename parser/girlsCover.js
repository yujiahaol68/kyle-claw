var cheerio = require('cheerio')

exports.parse = function (req, res, next) {
	var $ = cheerio.load(res.locals.htmlBody)
	var covers = []
	$('.lbtcimg1 p').each(function (idx, element) {
		var href = $(element).find('a').attr('href')
		var $element = $(element).find('a').find('img')
		covers.push({
			title: $element.attr('alt').trim(),
			src: $element.attr('src').trim(),
			href: href.trim()
		})
	})
	res.locals.coverCollection = covers
	res.send(covers)
}
