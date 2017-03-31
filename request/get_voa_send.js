const eventproxy = require('eventproxy')
const request = require('superagent')
const cheerio = require('cheerio')

let domain = 'http://www.51voa.com'

let reqUrl = 'http://www.51voa.com/VOA_Special_English/'

let bodyBridge = ''

let titleUrls = []
let contents = []
let ep = new eventproxy()

request.get(reqUrl)
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36')
    .set('Cookie', 'UM_distinctid=15b21eb444c44c-0699db9128af96-1d3e6850-1fa400-15b21eb444d3b9; SERVERID=ecc4d17a24e71f8ba7c434141c2dc95e|1490924623|1490922653; CNZZDATA1651922=cnzz_eid%3D466979480-1490921486-http%253A%252F%252Fcn.bing.com%252F%26ntime%3D1490921486')
    .end(function (err, res) {
        if (err) {
            return console.error(err)
        }
        let $ = cheerio.load(res.text)
        $('#list ul li').each(function (idx, element) {
            if(idx <= 5) {
                let $element = $(element).children().last()
                let href = domain + $element.attr('href')
                titleUrls.push(href)
            }
        })
        //console.log(titleUrls)
        parallelParse();
    })

function parallelParse() {

titleUrls.map(function (essayUrl) {
    request.get(essayUrl)
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36')
        .set('Cookie', 'UM_distinctid=15b21eb444c44c-0699db9128af96-1d3e6850-1fa400-15b21eb444d3b9; SERVERID=ecc4d17a24e71f8ba7c434141c2dc95e|1490924623|1490922653; CNZZDATA1651922=cnzz_eid%3D466979480-1490921486-http%253A%252F%252Fcn.bing.com%252F%26ntime%3D1490921486')
        .end(function (err, res) {
            console.log('fetch '+ essayUrl + ' successful')
            ep.emit('article_html', res.text)
        })
})




ep.after('article_html', titleUrls.length, function (articles) {
    articles.map(function (htmlBody) {
        let $ = cheerio.load(htmlBody)
        /*
        $('#content p').each(function (idx, element){
            bodyBridge +=  '<p>'+ $(element).text().trim() + '</p>'
        })*/
        contents.push({
            title: $('#title h1').text().trim(),
            author: $('.byline').text().trim(),
            //contextHtml: bodyBridge += '<hr/>'
            contextHtml: $('#content').html()
        })
        //bodyBridge = ''
    })
    
    //console.log('final:')
    //console.log(contents)
    require('../storage/email/sendEmail').sendVOA(contents)
})

}



