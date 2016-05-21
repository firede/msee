var fs = require('fs');
var path = require('path');
var MarkdownIt = require('markdown-it');
var mkdownIt = new MarkdownIt('default')
mkdownIt.inline.ruler.before('entity', 'multi-space', function reduceSpaces (state) {
  state.pending = state.src.replace(/(\t|\r|\n)/ig, ' ').replace(/\s\s*/ig, ' ')
  state.src = ''
  state.pos = state.posMax
  return true
})

console.log(mkdownIt.inline.ruler)

console.log(mkdownIt.inline.ruler.getRules('inline'))
var cardinal = require('cardinal');
var xtend = require('xtend');
var color = require('./color');
var table = require('text-table');
var addHeader = require('table-header').add;
var chalk = require('chalk');
var wcstring = require('wcstring');
var os = require('os');

var defaultOptions = {
    collapseNewlines: true,
    space: '',
    hrStart: '',
    hrChar: '-',
    hrEnd: '',
    headingStart: '\n',
    headingEnd: '\n\n',
    headingIndentChar: '#',
    headingIndent: function (token) {
        return Array(token.depth + 1).join(this.headingIndentChar)
    },
    codeStart: '\n',
    codeEnd: '\n\n',
    codePad: '    ',
    codeTheme: os.platform() === 'win32' ? require('./syntaxColor_win') : require('./syntaxColor'),
    blockquoteStart: '\n',
    blockquoteEnd: '\n\n',
    blockquoteColor: 'blockquote',
    blockquotePad: '  > ',
    blockquotePadColor: 'syntax',
    listStart: '\n',
    listEnd: '\n',
    listItemStart: '',
    listItemEnd: '\n',
    listItemColor: 'ul',
    listItemPad: {first: '  * ', regular: '    '},
    listItemPadColor: 'syntax',
    paragraphStart: '',
    paragraphEnd: '\n\n',
    width: process.stdout.columns || 80,
    maxWidth: -1,
    tableStart: '\n',
    tableSeparator: ' ',
    tableEnd: '\n\n'
};

var tokens;
var inline;
var token;
var blockDepth = 0;

function processInlineContent(children, env) {
    var result = []
    for (var i = 0; i < children.length; i++) {
        var child = children[i]
        console.log(child.type)
        switch (child.type) {
            case 'text':
                var content = child.content
                console.log(content)
                if (env.strong) {
                    content = color(content, 'strong')
                }
                if (env.em) {
                    content = color(content, 'em')
                }
                result.push(content)
                break;
            case 'softbreak':
                result.push('\n')
                break;
            case 'em_open':
                env.em = true
                break;
            case 'em_close':
                env.em = false
                break;
            case 'strong_open':
                env.strong = true;
                break;
            case 'strong_close':
                env.strong = false;
                break;
            case 'code_inline':
                var content = child.content
                if (env.strong) {
                    content = color(content, 'strong')
                }
                if (env.em) {
                    content = color(content, 'em')
                }
                result.push(color(content, 'code'))
                break;
        }
    }
    return result.join('')
}

function processInline(until) {
    var result = []
    while (next() && token.type !== until) {
        switch (token.type) {
            case 'inline':
                result.push(processInlineContent(token.children, {}));
                break;
        }
    }
    return result.join('')

    var out = '';
    var cap;

    function outLink (title, href) {
        out += '[' + color(title, 'strong') + '](' + color(href, 'link') + ')';
    }

    while (src) {
        // escape
        if (cap = inline.rules.escape.exec(src)) {
          src = src.substring(cap[0].length);
          out += cap[1];
          continue;
        }

        // code
        if (cap = inline.rules.code.exec(src)) {
            src = src.substring(cap[0].length);
            out += color(cap[2], 'code');
            continue;
        }

        // autolink
        if (cap = inline.rules.autolink.exec(src)) {
            src = src.substring(cap[0].length);
            out += color(cap[0], 'link');
            continue;
        }

        // url (gfm)
        if (cap = inline.rules.url.exec(src)) {
            src = src.substring(cap[0].length);
            outLink(cap[1], cap[1]);
          continue;
        }

        // tag
        if (cap = inline.rules.tag.exec(src)) {
            src = src.substring(cap[0].length);
            out += cap[0];
            continue;
        }

        // link
        if (cap = inline.rules.link.exec(src)) {
            src = src.substring(cap[0].length);
            outLink(cap[1], cap[2]);
            continue;
        }

        // reflink, nolink
        if ((cap = inline.rules.reflink.exec(src))
                || (cap = inline.rules.nolink.exec(src))) {
            src = src.substring(cap[0].length);
            out += cap[0];
            continue;
        }

        // strong
        if (cap = inline.rules.strong.exec(src)) {
            src = src.substring(cap[0].length);
            out += color(processInline(cap[2] || cap[1]), 'strong');
            continue;
        }

        // em
        if (cap = inline.rules.em.exec(src)) {
            src = src.substring(cap[0].length);
            out += color(processInline(cap[2] || cap[1]), 'em');
            continue;
        }

        // br
        if (cap = inline.rules.br.exec(src)) {
            src = src.substring(cap[0].length);
            out += '\n';
            continue;
        }

        // del (gfm)
        if (cap = inline.rules.del.exec(src)) {
            src = src.substring(cap[0].length);
            out += color(processInline(cap[1]), 'del');
            continue;
        }

        // text
        if (cap = inline.rules.text.exec(src)) {
            src = src.substring(cap[0].length);
            out += cap[0];
            continue;
        }

        if (src) {
          throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
        }
    }

    return out;
}

function processToken(options) {
    var type = token.type;
    var text = token.content;
    var content;

    function getOption(key) {
        var value = options[key];
        return typeof value === 'function' ? value(token) : value;
    }

    switch (type) {
        case "heading_open":
            var headerToken = token
            token.depth = parseInt(/h([0-9]+)/.exec(token.tag)[1], 10)
            return options.headingStart + blockFormat(processInline('heading_close'), {
                block_color: 'heading',
                pad: options.headingIndent(headerToken) + ' ',
                pad_color: 'syntax',
                width: options.width
            }) + options.headingEnd;
        case "paragraph_open":
            return processInline('paragraph_close')
        default:
            return ''
            return text;
    }


    switch (type) {
        case 'space': {
            return options.space;
        }
        case 'hr': {
            var hrStr = new Array(options.width).join(options.hrChar) + '\n';
            return options.hrStart + color(hrStr, type) + options.hrEnd;
        }
        case 'heading_open': {

            text = blockFormat(processInline(text), {
                block_color: type,
                pad: options.headingIndent(token) + ' ',
                pad_color: 'syntax',
                width: options.width
            })

            return options.headingStart + text + options.headingEnd;
        }
        case 'code': {
            content = '';

            if (token.lang === 'raw') {
                return text + '\n';
            }

            try {
                content = cardinal.highlight(text, {
                    theme: chalk.supportsColor
                            ? options.codeTheme
                            : require('cardinal/themes/empty')
                });
            }
            catch (e) {
                content = color(text, type);
            }

            content = content.replace(/^/gm, getOption('codePad'));

            return options.codeStart + content + options.codeEnd;
        }
        case 'table_open': {
            content = tableFormat(token, options);
            return options.tableStart + content + options.tableEnd;
        }
        case 'blockquote_start': {
            content = '';
            blockDepth++;

            while (next().type !== 'blockquote_end') {
                content += processToken(options);
            }
            content = blockFormat(content, {
                block_color: options.blockquoteColor,
                pad: options.blockquotePad,
                pad_color: options.blockquotePadColor,
                width: options.width
            });

            blockDepth--;
            return options.blockquoteStart + content + options.blockquoteEnd;
        }
        case 'list_start': {
            content = '';

            while (next().type !== 'list_end') {
                content += processToken(options);
            }

            return options.listStart + content + options.listEnd;
        }
        case 'list_item_start': {
            content = '';

            while (next().type !== 'list_item_end') {
                if (type === 'text') {
                    content += text;
                } else {
                    content += processToken(options);
                }
            }
            content = blockFormat(
                processInline(content),
                {
                    block_color: options.listItemColor,
                    pad: options.listItemPad,
                    pad_color: options.listItemPadColor,
                    width: options.width
                }
            );
            return options.listItemStart + content + options.listItemEnd;
        }
        case 'paragraph': {
            if (blockDepth > 0) {
                return text;
            }
            text = blockFormat(
                processInline(text),
                {
                    block_color: type,
                    pad: options.paragraphPad,
                    pad_color: options.paragraphPadColor,
                    width: options.width
                }
            );
            return options.paragraphStart + text + options.paragraphEnd;
        }
        default: {
            if (text) {
                return text;
            }
        }
    }
}

function next() {
    return token = tokens.shift();
}

function blockFormat(src, opts) {
    opts = opts || {};

    var retLines = [];

    src = wcstring(src).wrap(opts.width, opts.pad, function (padStr) {
        if (opts.pad_color) {
            return color(padStr, opts.pad_color)
        }
        return padStr
    });

    return color(src, opts.block_color);
}

function tableFormat (token, options) {
    var aligns = token.align.map(function (a) {
        return (a===null) ? 'l' : a[0];
    });
    var rows = token.cells.map(function (row) {
        return row.map(processInline);
    });
    var headers = token.header.map(function (s) {
        return processInline('**'+s+'**');
    });
    addHeader(rows, headers, { stringLength: getStringWidth });
    return table(rows, {
        align: aligns,
        stringLength: getStringWidth,
        hsep: options.tableSeparator
    });
}

/**
 * Returns the number of columns required to display the given string.
 */
function getStringWidth(str) {
  return wcstring(str).width();
}

exports.parse = function(text, options) {

    tokens = mkdownIt.parse(text, {})
    options = xtend(defaultOptions, options);

    var outputArr = [];
    var output;

    if (options.maxWidth !== -1 && options.width > options.maxWidth) {
        options.width = options.maxWidth
    }

    while (next()) {
        outputArr.push(processToken(options));
    }

    if (options.collapseNewlines) {
        output = outputArr.join('').replace(/\n\n\n/g, '\n\n');
    }

    tokens = null;
    token = null;

    return output;
}

exports.parseFile = function(file, options) {
    var filePath = path.resolve(__dirname, file);
    var ret = '';

    try {
        var text = fs.readFileSync(filePath).toString();
        ret = exports.parse(text, options);
    }
    catch (e) {
        throw e;
    }

    return ret;
}
