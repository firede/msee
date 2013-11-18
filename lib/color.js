var chalk = require('chalk');

var colorBrushes = {
    "syntax": chalk.grey,
    "heading": chalk.cyan.bold,
    "hr": chalk.grey,
    "code": chalk.yellow,
    "blockquote": chalk.blue
}

function color(text, type) {
    var colorBrush = colorBrushes[type] || chalk.stripColor;
    return colorBrush(text);
}

module.exports = color;
