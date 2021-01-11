const exec = require('./exec.js')
const { existsSync } = require('fs')

module.exports = (wd) => {
  process.chdir(wd)
  console.log('INFO: scanning for common static/public folder to allow Nginx access...')
  const folders = ['public', 'build']
  for (const folder of folders) {
    updateOwningGrp(folder)
  }
  console.log('SUCCESS: successfully scanned folders!')
}

function updateOwningGrp (folder) {
  if (existsSync(folder)) {
    exec(`chown -R git:www-data ${folder}`)
  }
}
