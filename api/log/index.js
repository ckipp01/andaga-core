'use strict'

const url = require('url')
const db = require('../../lib/db.js')
const { Log } = require('../../lib/models/models.js')

module.exports = (req, res) => {
  if (req.headers.authorization !== process.env.ANDAGA_AUTH) {
    res.writeHead(401, { 'Content-Type': 'text/plain' })
    res.end('Authentication required')
  } else {
    if (req.method === 'POST') {
      let body = ''
      req.on('data', chunk => {
        body += chunk.toString()
      })
      req.on('end', () => {
        try {
          const log = new Log(JSON.parse(body))
          db.storeLog(log)
            .then(result => {
              res.writeHead(200, { 'Content-Type': 'text/plain' })
              res.end('Stored log successfully')
            })
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'text/plain' })
          res.end(err.message)
        }
      })
    } else if (req.method === 'GET') {
      const params = url.parse(req.url, true)
      const amount = params.query.amount
        ? params.query.amount
        : 1
      db.retrieveLogs(amount)
        .then(result => {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(result))
        })
        .catch(err => {
          res.writeHead(400, { 'Content-Type': 'text/plain' })
          res.end(err.message)
        })
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' })
      res.end(req.method + ' is not allowed')
    }
  }
}
