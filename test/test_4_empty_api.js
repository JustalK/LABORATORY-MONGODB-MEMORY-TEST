'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')
const queries_test = require('@test/queries/test')

test.before(async () => {
  await m.start()
  await m_seeding.seed('dev')
})

test('[TEST] A simple test of call', async t => {
  const response = await queries_test.get_tests()

  t.is(response.get_tests.length, 10)
})
