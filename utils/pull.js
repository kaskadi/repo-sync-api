const exec = require('./exec.js')
const log = require('./logger.js')

module.exports = (repo, branch, uri, wd) => {
  process.chdir(wd)
  log(`synchronizing ${branch} branch of ${repo} repository...`, 'info')
  exec(`git pull ${uri} ${branch}`)
  log(`successfully synchronized ${branch} branch of ${repo} repository`, 'success')
}
