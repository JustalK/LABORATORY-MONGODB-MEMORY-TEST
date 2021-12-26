'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')

const mongo = require('@test/libs/mongo')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')

const test_0 = require('@test/cases/test_0')
const test_1 = require('@test/cases/test_1')

test.before(async () => {
  await m.start()
})

test.beforeEach(async () => {
  const uri = await mongo.connect()
  await m_seeding.seed('tests', uri)
})

test.afterEach(async () => {
  await mongo.disconnect()
})

test_1.cases(test)
test_0.cases(test)
