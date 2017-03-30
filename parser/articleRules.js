
let docs = []

exports.bbcParser = function (req, res, next) {
    let items = res.locals.resJson.results
    items.forEach(getbbcContext)
    res.locals.htmlArray = docs
    next()
}

function getbbcContext(element) {
    docs.push({
        'title' : element.Content.HeadlineLong,
        'intro' : element.Content.Intro,
        'author' : element.Content.Author[0].Content.Name,
        'htmlText' : element.Content.BodyHtml.replace(/<a.*?a>/g, '').replace(/<p>{"image".*?p>/g, '')
    }) 
}