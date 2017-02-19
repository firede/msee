var stream = require('./stream.js')
var fs = require('fs')
module.exports = function streamFile (file) {
  return fs.createReadStream(file).pipe(stream())
}
