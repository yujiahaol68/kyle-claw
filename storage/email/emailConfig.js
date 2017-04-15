const mailer = require('nodemailer')

// Email Server Config
exports.transOption = {
    service: '163',
    auth: {
        user: 'xxxx@163.com',
        pass: 'xxxx'
    }
}

// Message Detail Config
exports.message = {
    from: 'xxxx@163.com',
    to: 'xxxxx@gmail.com',
    subject: '',
    html: ''
}