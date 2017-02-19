var nopt = require('nopt');
var path = require('path');

exports.main = function(args, inpipe) {
    var opts = nopt(
        {
            "help": Boolean
        },
        {
            "h": [ "--help" ]
        },
        args,
        0
    );

    var files = opts.argv.remain;
    if (files.length === 0 && inpipe) {
        return inpipe.pipe(require('./stream')())
    }

    var streamFile = require('./streamFile')

    if (files.length === 0 || opts.help) {
        files = [path.resolve(__dirname, '../Help.md')]
    }

    // We use combined-stream-wait-for-it because its the
    // same library that is used by workshopper-adventure (a prominent user
    // of msee) with this dependency we can ensure a shorter download
    // time of workshoppers.
    var combinedStream = require('combined-stream-wait-for-it').create()

    files
      .map(function (file) {
        return path.resolve(process.cwd(), file)
      })
      .forEach(function (file) {
        combinedStream.append(streamFile(file))
      })

    combinedStream.resume()

    return combinedStream
}
