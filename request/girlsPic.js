var charset = require('superagent-charset')
var request = require('superagent')
charset(request)

// config
var baseURL = 'http://www.dazui88.com'
var tags = ['ligui', 'Beautyleg', 'simei']
var requestURL = baseURL + '/tag/' + tags[0] + '/'

exports.coverRequest = function (req, res, next) {

  request.get(baseURL + '/tag/' + tags[req.params.id-1] + '/')
  	.charset('gbk')
  	.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36')
    .end(function (err, sres) {

      if (err) {
        return next(err)
      }

      res.locals.htmlBody = sres.text
      next()
    })

}

exports.photoParallelRequest = function (req, res, next) {
  res.locals.coverCollection.forEach( function(element, index) {
      if (index <= 10)
      {
        reqImgEachPage(baseURL + element.href)
      }
  });
}

exports.reqImgEachPage = function (req, res, next) {

  res.locals.reqURL = 'http://www.dazui88.com/tag/Beautyleg/20170315280021.html'
  res.locals.downloadQueue = []

  request.get(res.locals.reqURL)
    .charset('gbk')
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36')
    .end(function (err, sres) {

      if (err) {
        next(err)
      }

      res.locals.htmlBody = sres.text
      next()
    })
}
