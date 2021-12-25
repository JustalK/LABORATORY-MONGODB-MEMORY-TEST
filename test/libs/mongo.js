const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

exports.dbConnect = async () => {
  const mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }

  await mongoose.connect(uri, mongooseOpts)
  return uri
}

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

/**
 * Remove all the data for all db collections.
 */
exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}
