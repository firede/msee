var fs = require('fs');
var path = require('path');
var marked = require('marked');
var eighty = require('eighty');
var cardinal = require('cardinal');
var color = require('./color');

var tokens;
var token;
var blockDepth = 0;

function processToken() {
    var type = token.type;
    var text = token.text;

    switch (type) {
        case 'space': {
            return '';
        }
        case 'hr': {
            return color(eighty.hr(), type) + '\n';
        }
        case 'heading': {
            var syntaxFlag = color(
                Array(token.depth + 1).join('#'),
                "syntax"
            );
            var content = color(text, type);

            return '\n' + syntaxFlag + ' ' + content + '\n\n';
        }
        case 'code': {
            var content = '';

            try {
                content = cardinal.highlight(text);
            }
            catch (e) {
                content = color(text, type);
            }
            
            content = blockFormat(content, {
                pad_str: '    '
            });

            return content + '\n';
        }
        case 'table': {
            // TODO
        }
        case 'blockquote_start': {
            var content = '';
            blockDepth++;

            while (next().type !== 'blockquote_end') {
                content += processToken();
            }
            content = blockFormat(content, {
                block_color: 'blockquote',
                pad_str: '  > ',
                pad_color: 'syntax'
            });

            blockDepth--;
            return '\n' + content + '\n\n';
        }

        case 'paragraph': {
            if (blockDepth > 0) {
                return text;
            }
            return color(text, type) + '\n';
        }
        default: {
            if (text) {
                return color(text, 'default');
            }
        }
    }
}

function next() {
    return token = tokens.shift();
}

function blockFormat(src, opts) {
    opts = opts || {};

    var lines = src.split('\n');
    var padStr = opts.pad_str || '';
    var padColor = opts.pad_color || opts.block_color;
    var retLines = [];

    if (padColor) {
        padStr = color(padStr, padColor);
    }

    lines.forEach(function(line) {
        if (opts.block_color) {
            line = color(line, opts.block_color);
        }
        retLines.push(padStr + line);
    });

    return retLines.join('\n');
}

exports.parse = function(text) {
    tokens = marked.lexer(text);

    var output = [];

    while (next()) {
        output.push(processToken());
    }

    tokens = null;
    token = null;

    return output.join('');
}

exports.parseFile = function(file) {
    var filePath = path.resolve(__dirname, file);
    var ret = '';
    
    try {
        var text = fs.readFileSync(filePath).toString();
        ret = exports.parse(text);
    }
    catch (e) {
        throw e;
    }

    return ret;
}
