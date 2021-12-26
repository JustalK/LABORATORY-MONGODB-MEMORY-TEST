'use strict'

const queries_test = require('@test/queries/test')

const cases = (test) => {
  test('[TEST] A simple test of call 4', async t => {
    const response = await queries_test.get_tests()
    t.is(response.get_tests.length, 1)
  })

  test('[TEST] A simple test of call', async t => {
    const response = await queries_test.get_tests()
    t.is(response.get_tests.length, 1)
  })

  test('[TEST] A simple test of call 2', async t => {
    const response = await queries_test.get_tests()
    t.is(response.get_tests.length, 1)
  })

  test('[TEST] A simple test of call 3', async t => {
    const response = await queries_test.get_tests()
    t.is(response.get_tests.length, 1)
  })
}

module.exports = {
  cases
}
