const test = require('tap').test
const msee = require('../')
const path = require('path')
const fs = require('fs')
const os = require('os')
const cli = require('../lib/cli')
const streamToString = require('stream-to-string')

function fixture (fileName) {
	return path.join(__dirname, 'fixtures', fileName)
}

test('default general test', function (t) {
	var platform = os.platform() === 'linux' ? '.linux' : ''
	var out = fs.readFileSync(fixture('general' + platform + '.out'), 'utf8')
	t.equal(
		msee.parseFile(fixture('general.md'), {maxWidth: 80}),
		out
	)
	t.end()
})

test('multifile test', function (t) {

	streamToString(cli.main([
		fixture('multifile-first.md'),
		fixture('multifile-second.md')
	]), function (err, msg) {
		var out = fs.readFileSync(fixture('multifile.out'), 'utf8')
		t.equal(err, null)
		t.equal(msg, out)
		t.end()
	})
})
