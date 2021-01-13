const exec = require('./exec.js')
const log = require('./logger.js')

module.exports = dirs => {
  for (const dir of dirs) {
    log(`Cleaning up files from ${dir}`, 'info')
    exec(`rm -r -f ${dir}`)
    log('Files cleaned up!', 'success')
  }
}
