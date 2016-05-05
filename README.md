msee
===

[![NPM version](https://img.shields.io/npm/v/msee.svg?style=flat-square)](https://npmjs.org/package/msee)
[![Travis](https://img.shields.io/travis/firede/msee/master.svg?style=flat-square)](https://travis-ci.org/firede/msee)
[![Coveralls branch](https://img.shields.io/coveralls/firede/msee/master.svg?style=flat-square)](https://coveralls.io/github/firede/msee?branch=master)
[![Dependencies Status](https://img.shields.io/david/firede/msee.svg?style=flat-square)](https://david-dm.org/firede/msee)
[![download per month](https://img.shields.io/npm/dm/msee.svg?style=flat-square)](https://npmjs.org/package/msee)
[![License](https://img.shields.io/npm/l/msee.svg?style=flat-square)](https://npmjs.org/package/msee)

*msee* is a command-line tool to read markdown file.

And it's a library help your command-line software to output readable markdown content.

## Screenshot

<img width="752" alt="msee" src="https://cloud.githubusercontent.com/assets/157338/10902801/531ba216-823d-11e5-87ac-986b8d5ea4cc.png">

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
