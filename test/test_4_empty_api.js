'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')

const { dbConnect, dbDisconnect } = require('@test/libs/mongo')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')
const queries_test = require('@test/queries/test')

test.before(async () => {
  await m.start()
  const uri = await dbConnect()
  await m_seeding.seed('dev', uri)
})

test.after(async () => {
  await dbDisconnect()
})

test('[TEST] A simple test of call with dev', async t => {
  const response = await queries_test.get_tests()
  t.is(response.get_tests.length, 2)
})
