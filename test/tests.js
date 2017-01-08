const hex = require('../dist/hexie')
const tape = require('tape')

tape.test('hex is a function', test => {
  test.plan(1)

  test.same(typeof hex, 'function')
})
