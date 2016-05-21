const test = require('tap').test
const msee = require('../')
const path = require('path')
const fs = require('fs')
const os = require('os')

test('default general test', function (t) {
	var platform = os.platform() === 'linux' ? '.linux' : ''
	var pth = 'general' + platform + '.out'
	var out = fs.readFileSync(path.join(__dirname, 'fixtures', pth), 'utf8')
	t.equal(
		msee.parseFile(path.join(__dirname, 'fixtures', 'general.md'), {maxWidth: 80}),
		out
	)
	t.end()
})
