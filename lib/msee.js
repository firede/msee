var fs = require('fs');
var path = require('path');
var marked = require('marked');
var eighty = require('eighty');
var cardinal = require('cardinal');
var color = require('./color');

var tokens;
var token;
var inBlock = false;

function processToken() {
    var type = token.type;
    var text = token.text;

    switch (type) {
        case 'space':
            return '';
        case 'heading': {
            var syntaxFlag = color(
                Array(token.depth + 1).join('#'),
                "syntax"
            );
            var content = color(text, type);

            return '\n' + syntaxFlag + ' ' + content + '\n\n';
        }
        case 'paragraph': {
            if (inBlock) {
                return text;
            }
            return color(text, type) + '\n';
        }
        case 'hr': {
            return color(eighty.hr(), type) + '\n';
        }
        case 'code': {
            var content;

            try {
                content = cardinal.highlight(text);
            }
            catch (e) {
                content = color(text, type);
            }
            
            return padBlock(content, '    ') + '\n';
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

function padBlock(src, prefix) {
    var lines = src.split('\n');
    var newLines = [];

    lines.forEach(function(line) {
        if (line) {
            newLines.push(prefix + line);
        }
    });

    return newLines.join('\n');
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
