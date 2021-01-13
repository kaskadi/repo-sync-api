const { existsSync } = require('fs')

const exec = require('../utils/exec.js')
const log = require('../utils/logger.js')
const getWd = require('../utils/get-wd.js')

module.exports = (repoData) => {
  process.chdir(getWd(repoData, { lvl: 'branch' }))
  log('scanning for common static/public folder to allow Nginx access...', 'info')
  const folders = ['public', 'build']
  for (const folder of folders) {
    updateOwningGrp(folder)
  }
  log('successfully scanned folders!', 'success')
}

function updateOwningGrp (folder) {
  if (existsSync(folder)) {
    exec(`chown -R git:www-data ${folder}`)
  }
}
