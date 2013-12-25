msee
===

[![Dependencies Status](https://david-dm.org/firede/msee.png)](https://david-dm.org/firede/msee)

*msee* is a command-line tool to read markdown file.

And it's a library help your command-line software to output readable markdown content.

## Screenshot

![msee](https://f.cloud.github.com/assets/157338/1808778/175a83aa-6d77-11e3-8cf7-7c756bab34f8.png)

## Installation

    $ npm install -g msee

## Usage

    msee <file>
    msee <file> | less

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

(The MIT License)

Copyright (c) 2013-2014 Firede <firede@firede.us>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
