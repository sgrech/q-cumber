process.env.NODE_ENV = 'test'

require('babel-register')({
  sourceMaps: true
})

const Promise = require('bluebird')
const mongoose = require('mongoose')
const colors = require('colors') // eslint-disable-line no-unused-vars
const config = require('../src/config').default
const { connectionString } = config.env.database

mongoose.Promise = Promise

before(function (done) {
  this.timeout(20000)
  console.log(`Mongoose connecting to ${connectionString}`.green)
  mongoose.connect(connectionString, { useMongoClient: true })

  var db = mongoose.connection

  db.on('connected', function () {
    console.log(`Mongoose default connection open to ${connectionString}`.green)
    done()
  })

  // If the connection throws an error
  db.on('error', function (err) {
    console.log(`Mongoose default connection error: ${err}`.red)
  })

  // When the connection is disconnected
  db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected'.yellow)
  })

  process.on('SIGINT', function () {
    db.close(function () {
      console.log('Mongoose default connection disconnected through app termination'.green)
      process.exit(0)
    })
  })
})
