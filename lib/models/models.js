'use strict'

class Log {
  constructor (logEntry) {
    Object.keys(logEntry).forEach(entryKey => {
      switch (entryKey) {
      case 'date':
      case 'category':
      case 'notes':
      case 'location':
      case 'project':
        if (typeof logEntry[entryKey] === 'string') {
          this[entryKey] = logEntry[entryKey]
        } else {
          throw new Error(`Type of ${logEntry[entryKey]} found was ${typeof logEntry[entryKey]}, but must be sring`)
        }
        break
      case 'time':
        if (typeof logEntry[entryKey] === 'number') {
          this[entryKey] = logEntry[entryKey]
        } else {
          throw new Error(`Type of ${logEntry[entryKey]} found was ${typeof logEntry[entryKey]}, but must be number`)
        }
        break
      case 'tags':
        if (logEntry[entryKey] instanceof Array) {
          this[entryKey] = logEntry[entryKey]
        } else {
          throw new Error(`Type of ${logEntry[entryKey]} found was ${typeof logEntry[entryKey]}, but must be Array`)
        }
        break
      default:
        throw new Error(`Unknown log field found: ${entryKey}`)
      }
    })
  }
}

module.exports = { Log }
