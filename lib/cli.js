var msee = require('./msee');
var nopt = require('nopt');
var path = require('path');
var tty = require('tty');
var options = require('./options');
var fs = require('fs');

function optionsHelp() {
    return '| option | info | default |\n' +
           '|--------|------|---------|\n' +
        Object.keys(options).map(function (option) {
            var optionInfo = options[option]
            var def = optionInfo.default
            if (typeof def === 'object') {
                def = Object.keys(def).map(function (defName) {
                    var name;
                    var value = def[defName];
                    if (defName === 'first') {
                        if (typeof value === 'object') {
                            var result = '';
                            if (value.left) {
                               result += '1L ' + value.left;
                            }
                            if (value.regular) {
                                if (value.left) {
                                    result += '\\n';
                                }
                                result += '1R ' + value.regular;
                            }
                            return result
                        }
                        name = '1 ' + value;
                    } else if (defName === 'left') {
                        name = 'L ' + value;
                    } else if (defName === 'regular') {
                        name = 'R ' + value;
                    } else {
                        name = '?';
                    }
                    return name;
                }).join('\\n');
            }
            if (typeof def === 'string') {
                def = '"' + def.split('\n').join('\\n') + '"'
            }
            return '| **--' + optionInfo.cli + '** | ' + optionInfo.description + (optionInfo.padding ? '_(format: padding)_' : '') + ' | `' + def + '` |';
        }).join('\n');
}

function applyPadding(target, rightLeft, value) {
    if (rightLeft === 'R') {
        target.right = value;
    } else if (rightLeft === 'L') {
        target.left = value;
    } else {
        return value;
    }
    return target
}

exports.main = function() {
    var keys = {
        "help": Boolean
    };
    Object.keys(options).forEach(function (option) {
        keys[option] = typeof option.default === 'string' ? String : Number;
    });
    var opts = nopt(keys,
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
        var runtimeOptions = Object.keys(options).reduce(function (runtimeOptions, option) {
            var optionInfo = options[option]
            var value = opts[optionInfo.cli]
            if (value) {
                if (optionInfo.padding) {
                    var lines = String(value).split(/\n|\\n/ig)
                    lines.forEach(function (line) {
                        var part = /^(((1|\*)(R|L)?)|(R|F))\s+(.*)/.exec(line)
                        if (part) {
                            if (typeof value === 'string') {
                                value = {}
                            }
                            if (part[3] === '1') {
                                value.first = applyPadding(value.first || {}, part[4], part[6])
                            } else if (part[3] === '*') {
                                value.regular = applyPadding(value.regular || {}, part[4], part[6])
                            } else {
                                value = applyPadding(value, part[5], part[6])
                            }
                        }
                    })
                }
                runtimeOptions[option] = value
            }
            return runtimeOptions
        }, {})
        var files = opts.argv.remain;
        if (files.length > 0) {
            try {
                var file = path.resolve(process.cwd(), files[0]);
                var text = msee.parseFile(file, runtimeOptions);
                process.stdout.write(text);
            }
            catch (e) {
                console.error(e.message);
            }
        }
        else if (!tty.isatty()) {
            var text = '';
            process.stdin.on('data', function(chunk) {
                text += chunk;
            });
            process.stdin.on('end', function() {
                var out = msee.parse(text, runtimeOptions);
                process.stdout.write(out);
            });
        }
        else {
            var helpFile = path.resolve(__dirname, '../Help.md');
            var text = fs.readFileSync(helpFile).toString();
            text = text.replace('${options}', optionsHelp());
            process.stdout.write(msee.parse(text, runtimeOptions));
        }
    }
}
