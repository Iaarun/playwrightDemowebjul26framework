const fs = require('node:fs')
const path = require('node:path')

const levels = ['debug', 'info', 'warn', 'error']
const configuredLevel = (process.env.LOG_LEVEL || 'info').toLowerCase()
const minimumLevel = levels.indexOf(configuredLevel)
const logDirectory = path.join(process.cwd(), 'logs')
const logFile = process.env.LOG_FILE
  ? path.resolve(process.env.LOG_FILE)
  : path.join(logDirectory, 'automation.log')

if (minimumLevel === -1) {
  throw new Error(`Invalid LOG_LEVEL "${configuredLevel}". Use debug, info, warn, or error.`)
}

fs.mkdirSync(path.dirname(logFile), { recursive: true })

function write(level, message, context = '') {
  if (levels.indexOf(level) < minimumLevel) {
    return
  }

  const contextText = context ? ` [${context}]` : ''
  const line = `${new Date().toISOString()} ${level.toUpperCase()}${contextText} ${message}`
  const output = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log

  output(line)
  fs.appendFileSync(logFile, `${line}${require('node:os').EOL}`, 'utf8')
}

module.exports = {
  debug: (message, context) => write('debug', message, context),
  info: (message, context) => write('info', message, context),
  warn: (message, context) => write('warn', message, context),
  error: (message, context) => write('error', message, context),
}
