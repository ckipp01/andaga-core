'use strict'

const url = require('url')
const { storeLog, retrieveLogs } = require('../../lib/db.js')
const { Log } = require('../../lib/models/models.js')

module.exports = (req, res) => {
  if (req.headers.authorization !== process.env.ANDAGA_AUTH) {
    res.writeHead(401, { 'Content-Type': 'text/plain' })
    res.end('Authentication required')
  } else {
    if (req.method === 'POST') {
      const body = []
      req.on('data', chunk => {
        body.push(chunk)
      })
      req.on('end', () => {
        try {
          const log = new Log(JSON.parse(body))
          storeLog(log)
            .then(result => {
              console.info('Stored log successfully')
              res.writeHead(200, { 'Content-Type': 'text/plain' })
              res.end('Stored log successfully')
            })
        } catch (err) {
          console.err(err.message)
          res.writeHead(400, { 'Content-Type': 'text/plain' })
          res.end(err.message)
        }
      })
    } else if (req.method === 'GET') {
      const params = url.parse(req.url, true)
      const amount = params.query.amount
        ? params.query.amount
        : 1
      retrieveLogs(amount)
        .then(result => {
          console.info('Successfully recalled log')
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(result))
        })
        .catch(err => {
          console.err(err.message)
          res.writeHead(400, { 'Content-Type': 'text/plain' })
          res.end(err.message)
        })
    } else {
      console.err('Request blocked')
      res.writeHead(405, { 'Content-Type': 'text/plain' })
      res.end(req.method + ' is not allowed')
    }
  }
}
