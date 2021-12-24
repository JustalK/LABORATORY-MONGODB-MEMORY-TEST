'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')

test.before(async () => {
  await m.start()
  // For filling up the admin only
  await m_seeding.seed('dev')
})

test('[STATIC] Testing access to the app', async t => {
  const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + '/')
  const response_json = await response.json()
  t.is(response_json.status, 'working')
})

test('[STATIC] Testing access to the documentation', async t => {
  const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + '/documentation')
  t.is(response.status, 200)
})

test('[STATIC] Access to the admin', async t => {
  const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + '/admin', {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + Buffer.from(process.env.USERNAME_ADMINBRO + ':' + process.env.PASSWORD_ADMINBRO).toString('base64')
    }
  })
  t.is(response.status, 200)
})

test('[STATIC] Trying to access to the admin', async t => {
  const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + '/admin')
  t.is(response.status, 401)
})
