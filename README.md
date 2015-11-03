msee
===

[![NPM version](https://img.shields.io/npm/v/msee.svg?style=flat-square)](https://npmjs.org/package/msee)
[![Dependencies Status](https://img.shields.io/david/firede/msee.svg?style=flat-square)](https://david-dm.org/firede/msee)
[![download per month](https://img.shields.io/npm/dm/msee.svg?style=flat-square)](https://npmjs.org/package/msee)
[![License](https://img.shields.io/npm/l/msee.svg?style=flat-square)](https://npmjs.org/package/msee)

*msee* is a command-line tool to read markdown file.

And it's a library help your command-line software to output readable markdown content.

## Screenshot

![msee](https://f.cloud.github.com/assets/157338/1808778/175a83aa-6d77-11e3-8cf7-7c756bab34f8.png)

## Installation

    $ npm install -g msee

## Usage

    msee <file>
    msee <file> | less
    cat <file> | msee

## API

```javascript
var msee = require('msee');

// parse markdown text
msee.parse('> hello world!');

// parse markdown file
msee.parseFile('~/doc/readme.md');
```

## Contributors

https://github.com/firede/msee/graphs/contributors

## License

MIT &copy; [Firede](https://github.com/firede)

---

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/firede/msee/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
