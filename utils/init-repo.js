const exec = require('./exec.js')
const log = require('./logger.js')

module.exports = (deployPath) => {
  log('first synchronization request detected, creating deployment folder...', 'info')
  exec(`mkdir ${deployPath}`)
  log(`deployment folder created @ ${deployPath}`, 'success')
}
