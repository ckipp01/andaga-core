'use strict'

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const collection = (process.env.NODE_ENV === 'production')
  ? process.env.ANDAGA_DB_COLLECTION
  : process.env.ANDAGA_TEST_COLLECTION

const mongo = {
  name: process.env.ANDAGA_DB_NAME,
  collection: collection,
  url: process.env.ANDAGA_DB_URL
}

const storeLog = log => {
  return new Promise((resolve, reject) => {
    console.log(log)
    const client = new MongoClient(mongo.url, { useNewUrlParser: true })
    client.connect(err => {
      assert.strict.equal(null, err)
      console.log('should be connected')
      err
        ? reject(err)
        : console.info('Connected successfully to server to store log')
      const db = client.db(mongo.name)

      insertDocument(db, mongo.collection, log)
        .then(result => {
          client.close()
          console.info('Log storred successfully')
          resolve(result)
        })
        .catch(err => {
          client.close()
          reject(err)
        })
    })
  })
}

const insertDocument = (db, collectionName, log) => {
  console.log('in insert')
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)
    collection.insertOne(log)
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = { storeLog }
