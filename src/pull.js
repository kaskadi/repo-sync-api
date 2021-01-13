const exec = require('../utils/exec.js')
const log = require('../utils/logger.js')
const getWd = require('./get-wd.js')

module.exports = (repoData, uri) => {
  const { repo, branch } = repoData
  process.chdir(getWd(repoData, { lvl: 'branch' }))
  log(`synchronizing ${branch} branch of ${repo} repository...`, 'info')
  exec(`git pull ${uri} ${branch}`)
  log(`successfully synchronized ${branch} branch of ${repo} repository`, 'success')
}
