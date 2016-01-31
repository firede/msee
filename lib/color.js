var chalk = require('chalk');

var colorBrushes = {
    "syntax": chalk.grey,
    "heading": chalk.cyan.bold,
    "hr": chalk.grey,
    "code": chalk.grey,
    "blockquote": chalk.blue,
    "bold": chalk.bold,
    "link": chalk.blue,
    "strong": chalk.bold,
    "em": chalk.italic,
    "del": chalk.strikethrough,
    "ul": null,
    "paragraph": null
}

function color(text, type) {
    var colorBrush = colorBrushes[type];
    if (colorBrush === null)
      return text;
    if (!colorBrush)
        colorBrush = chalk.stripColor;
    return colorBrush(text);
}

module.exports = color;
