const mailer = require('nodemailer')


// Email Server Config
exports.transOption = {
    service: '163',
    auth: {
        user: 'XXXXXX@163.com',
        pass: 'XXXX'
    }
}

// Message Detail Config
exports.message = {
    from: 'XXXXXX@163.com',
    to: 'XXXXX@example.com',
    subject: 'Your private BBC articles',
    html: '<p>Your favourite tag of articles is: <strong>wwfuture</strong></p>'
}