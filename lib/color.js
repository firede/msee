var colors = require('colors');

var theme = {
    "syntax": "grey",
    "heading": [ "cyan", "bold" ],
    "hr": "grey",
    "code": "yellow",
    "blockquote": "blue",
    "ol": "white",
    "ul": "white"
}

function color(text, type) {
    var styles = theme[type] || '';

    if (typeof styles === 'string') {
        styles = [ styles ];
    }

    styles.forEach(function(style) {
        if (style) {
            text = text[style];
        }
    });

    return text;
}

module.exports = color;
