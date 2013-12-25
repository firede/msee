var msee = require('./msee');
var nopt = require('nopt');
var path = require('path');

function showHelp() {
    var helpFile = path.resolve(__dirname, '../Help.md');
    var helpText = msee.parseFile(helpFile);
    
    console.log(helpText);
}

exports.main = function() {
    var opts = nopt(
        {
            "help": Boolean
        },
        {
            "h": [ "--help" ]
        },
        process.argv,
        2
    );

    if (opts.help) {
        showHelp();
    }
    else {
        var files = opts.argv.remain;
        if (files.length > 0) {
            try {
                var file = path.resolve(process.cwd(), files[0]);
                var text = msee.parseFile(file);
                console.log(text);
            }
            catch (e) {
                console.error(e.message);
            }
        }
        else {
            showHelp();
        }
    }
}
