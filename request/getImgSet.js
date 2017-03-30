var eventproxy = require('eventproxy')
var charset = require('superagent-charset')
var superagent = require('superagent')
charset(superagent)
var cheerio = require('cheerio')
var url = require('url')
var Bagpipe = require('bagpipe')
var bagpipe = new Bagpipe(15)
var down = require('../storage/download/down')

var baseUrl = 'http://www.dazui88.com/tag/youwu/20170130255503'

// Get Page number
superagent.get(baseUrl + '.html')
  .charset('gbk')
  .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36')
  .end(function (err, res) {
    if (err) {
      return console.error(err)
    }
    var topicUrls = []
    var $ = cheerio.load(res.text)
    var reg = /[1-9][0-9]*/g
    var pages = Number($('.pagebreak1 ul li a').first().text().match(reg))

    // Generate each page links
    while (pages > 1) {
      var href = baseUrl + '_' + pages + '.html'
      topicUrls.push(href)
      pages--
    }
    topicUrls.push(baseUrl + '.html')

    // Limit parallel request number
    var ep = new eventproxy()

    ep.after('topic_html', topicUrls.length, function (topics) {
      topics = topics.map(function (topicPair) {
        var topicUrl = topicPair[0]
        var topicHtml = topicPair[1]
        var $ = cheerio.load(topicHtml)
        var pageImg = []
        $('#efpBigPic p img').each(function (idx, element) {
          pageImg.push({
            url:  $(element).attr('src').trim(),
            name:   $(element).attr('alt').trim(),
          })
        })
        return pageImg
      })

      console.log('final:')
      console.log(topics)
      topics.map(function (imgGruop) {
          imgGruop.map(function (imgPair) {
            bagpipe.push(down.download, imgPair.url, imgPair.name, function (err, data) {
              console.log(data)
            })
        })
      })
    })

    topicUrls.forEach(function (topicUrl) {
      superagent.get(topicUrl)
        .charset('gbk')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36')
        .end(function (err, res) {
          console.log('fetch --> ' + topicUrl + ' --> successful')
          ep.emit('topic_html', [topicUrl, res.text])
        })
    })
  })
