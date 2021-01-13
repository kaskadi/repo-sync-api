const exec = require('./exec.js')
const getWd = require('./get-wd.js')
const cleanup = require('./cleanup.js')
const log = require('./logger.js')
const { existsSync, readdirSync } = require('fs')

module.exports = () => {
  log('Initializing temporary directory...', 'info')
  const tmpDir = getWd({})
  if (!existsSync(tmpDir)) {
    exec(`mkdir ${tmpDir}`)
  }
  const dirs = readdirSync(tmpDir)
  cleanup(dirs)
  log('Temporary directory ready!', 'success')
}
