var chalk = require('chalk');
var os = require('os');
var lightColor = os.platform() === 'linux' ? chalk.white : chalk.grey;


var colorBrushes = {
    "syntax": lightColor,
    "heading": chalk.cyan.bold,
    "hr": lightColor,
    "code": lightColor,
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
