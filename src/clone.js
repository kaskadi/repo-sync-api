const exec = require('../utils/exec.js')
const log = require('../utils/logger.js')

module.exports = (repo, branch, uri, wd) => {
  const dirParts = wd.split('/')
  const parentDir = dirParts.slice(0, -1).join('/') // we want to be in the parent folder when cloning
  process.chdir(parentDir)
  log(`folder for ${branch} branch of ${repo} repository does not exists, creating...`, 'info')
  exec(`git clone ${uri}`)
  exec(`mv ${parentDir}/${repo} ${parentDir}/${dirParts.slice(-1)[0]}`)
  log(`folder for ${branch} branch of ${repo} repository successfully created!`, 'success')
}
