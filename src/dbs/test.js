/**
* Module for managing the dbs for test
* @module dbs/test
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
  * Call mongodb for getting every document in the collection
  * @return {[Test]} The tests or null
  **/
  get_all: () => {
    return model.find()
  }
}
