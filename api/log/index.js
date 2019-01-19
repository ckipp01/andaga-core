const {json} = require('micro')
const db = require('../../lib/db.js')

module.exports = async (req, res) => {
  try {
  const log = await json(req)
  const result = await db.storeLog(log)
  return result 
  } catch (err) {
    console.log(err)
    return 'something went wrong'
  }
}
