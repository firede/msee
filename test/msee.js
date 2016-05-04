'use strict'
const test = require('tap').test
const msee = require('../')
const path = require('path')
const fs = require('fs')

test('default general test', function (t) {
	t.equal(
		msee.parseFile(path.join(__dirname, 'fixtures', 'general.md')),
		fs.readFileSync(path.join(__dirname, 'fixtures', 'general.out'), 'utf8')
	)
	t.end()
})
