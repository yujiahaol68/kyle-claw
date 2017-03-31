const mailer = require('nodemailer')


// Email Server Config
exports.transOption = {
    service: '163',
    auth: {
        user: 'xxxxxx@163.com',
        pass: 'xxxxxx'
    }
}

// Message Detail Config
exports.message = {
    from: 'xxxxxxx@163.com',
    to: 'xxxxxxx@163.com',
    subject: '',
    html: ''
}