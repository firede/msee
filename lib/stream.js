
const msee = require('./msee.js')
const through2 = require('through2')

module.exports = function stream () {
  var all = ''
  return through2(function (chunk, enc, callback) {
    all += chunk.toString()
    callback()
  }, function (callback) {
    this.push(msee.parse(all))
    callback()
  })
}
