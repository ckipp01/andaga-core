'use strict'

const db = require('../../lib/db.js')

module.exports = (req, res) => {
  if (req.headers.authorization !== process.env.ANDAGA_AUTH) {
    res.writeHead(401, { 'Content-Type': 'text/plain' })
    res.end('Authentication required')
  } else {
    try {
      db.getCategories()
        .then(result => {
          console.info('Successfully retrieved categories')
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(result))
        })
    } catch (err) {
      console.err(err.message)
      res.writeHead(400, { 'Content-Type': 'text/plain' })
      res.end(err.message)
    }
  }
}
