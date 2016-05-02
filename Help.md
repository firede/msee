msee
===

`msee` is a command-line tool to read markdown files.

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

## Options
${options}

### Format: Padding
Padding can be specified in the following format:

```
"L <left padding string>"
"R <right padding string>"
"1 <first line left padding string>"
"* <regular line left padding string>"
"1R <first line right padding string>"
"*R <regular line right padding string>"
```

With a `\n` to separate multiple statements. Example:

```
"1L   - \nR $\n*L     "
```

Here every line will have `$` as a right padding. The first line will start with `"  - "` and follow-up lines will start with `"    "`.
