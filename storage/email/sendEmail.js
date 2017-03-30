const mailer = require('nodemailer')
const message = require('./emailConfig').message
const transOption = require('./emailConfig').transOption

let htmlContent = ''

exports.sendIt = function (req, res, next) {
    if(res.locals.htmlArray) {
        res.locals.htmlArray.forEach(function(element) {
            htmlContent += "<br/><br/><h1>" + element.title + "</h1>" +
                            "<h3>" + element.intro + "</h3>" +
                            "<h5>BY:&nbsp;&nbsp;" + element.author + "</h5>" +
                            "<article>" + element.htmlText + "</article>" +
                            "<br/><br/><hr/>"
        })

        message.html += htmlContent

        let transporter = mailer.createTransport(transOption)

        transporter.sendMail(message, function (err, info) {
            if (err) {
                res.send(err)
            }
            else {
                res.send('Send Successfully!')
            }
        })

    }
    else {
        res.send('NO Data for sending!')
    }

}