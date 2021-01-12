const exec = require('../utils/exec.js')
const log = require('../utils/logger.js')

module.exports = (repo, branch, uri, wd) => {
  process.chdir(wd)
  log(`folder for ${branch} branch of ${repo} repository does not exists, creating...`, 'info')
  exec(`git clone ${uri}`)
  exec(`mv ${repo} ${branch}`)
  log(`folder for ${branch} branch of ${repo} repository successfully created!`, 'success')
}
