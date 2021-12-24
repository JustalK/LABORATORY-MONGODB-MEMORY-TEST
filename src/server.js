/**
* The module for managing everything relative to the server
* @module server
*/
'use strict'

const express = require('express')
const voyagerMiddleware = require('graphql-voyager/middleware')
const apollo = require('@src/apollo')
const logger = require('@src/libs/logger')

module.exports = {
  /**
  * Create the restify server
  * @return {Express} A server restify without any routes
  **/
  create_server: () => {
    return express()
  },
  /**
  * Allow us to use Graph QL with fastify
  * @param {Express} server The server allowed to use graphQl
  **/
  register_graphql: (server) => {
    const apollo_server = apollo.get_handler()
    apollo_server.applyMiddleware({ app: server, path: process.env.ENDPOINT })
  },
  /**
  * Allow us to use the middleware voyager
  * @param {Express} server The server allowed to use the middleware voyager
  **/
  register_voyager: (server) => {
    server.use(process.env.ENDPOINT_ERD, voyagerMiddleware.express({ endpointUrl: process.env.ENDPOINT }))
  },
  /**
  * Allow us to use the middleware express status monitor
  * @param {Express} server The server allowed to use the monitor
  **/
  register_monitor: (server) => {
    server.use(require('express-status-monitor')())
  },
  /**
  * Allow us to use the middleware helmet for hidding some headers
  * @param {Express} server The server allowed to use helmet
  **/
  register_helmet: (server) => {
    server.use(require('helmet')())
  },
  /**
  * Start the server using the parameter
  * @param {string} name The name of the server
  * @param {string} host The host of the server
  * @param {string} port The port of the server
  * @return {Promise<boolean>} True if the server start or else an error
  **/
  start: async (name, host, port) => {
    const server = module.exports.create_server()

    module.exports.register_graphql(server)
    module.exports.register_voyager(server)
    module.exports.register_monitor(server)
    module.exports.register_helmet(server)

    server.use('/', require('./routes/app'))

    return new Promise((resolve, reject) => {
      server.listen({ port: port, host: host }, (error) => module.exports.callback(error, resolve, reject))
    })
  },
  /**
  * Handle the callback of the server listening
  * @param {Error} error The object error returned by the listen function
  **/
  callback: (error, resolve, reject) => {
    if (error) {
      logger.info('Server fail to start !')
      logger.log('Server fail to start !')
      reject(new Error('Server fail to start !'))
    }
    logger.info('Server Started')
    logger.log('Logger Activated')
    resolve(true)
  }
}
