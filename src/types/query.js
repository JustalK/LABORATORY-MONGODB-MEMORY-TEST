'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  """
  Queries of the app
  """
  type Query  {
    """
    Return the test
    """
    get_tests: [Test]!
  }
`
