msee
===

`msee` is a command-line tool to read markdown file.

And it's a library help your command-line software to output readable markdown content.

## Usage

    msee <file>
    msee <file> | less
    cat <file> | msee

## API

```javascript
var msee = require('msee');

// parse markdown text
msee.parse('> hello world!');

// ...with options
// @see https://github.com/firede/msee/blob/master/lib/msee.js#L9
msee.parse(str, {
    collapseNewlines: false,
    width: 120
});

// parse markdown file
msee.parseFile('~/doc/readme.md');
```
