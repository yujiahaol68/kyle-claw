var request = require('superagent')
var fs = require('fs')

exports.download = function (src, targetName, callback) {
	console.log(src)
	var stream = fs.createWriteStream('../storage/download/pics/' + targetName + '.jpg')
	request.get(src)
	   .pipe(stream)
	   .on('close', function () {
	   		callback(null, 'DownLoad --> ' + targetName + ' --> Done!')
	   })
}

