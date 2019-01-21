'use strict'

const db = require('../../lib/db.js')

module.exports = (req, res) => {
  if (req.headers.authorization !== process.env.ANDAGA_AUTH) {
    res.end('Authentication required')
  } else {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        db.storeLog(JSON.parse(body))
          .then(result => res.end('Stored log successfully'))
      } catch (err) {
        console.log(err)
        res.end('An error occured when saving your log')
      }
    })
  }
}
