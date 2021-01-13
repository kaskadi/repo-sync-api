const exec = require('../utils/exec.js')
const log = require('../utils/logger.js')

const getWd = require('./get-wd.js')

module.exports = (repoData, uri) => {
  const { repo, branch } = repoData
  const path = getWd(repoData, { lvl: 'branch' })
  const parentPath = path.split('/').slice(0, -1).join('/')
  process.chdir(parentPath) // we want to be in the parent folder when cloning
  log(`folder for ${branch} branch of ${repo} repository does not exists, creating...`, 'info')
  exec(`git clone ${uri}`)
  exec(`mv ${parentPath}/${repo} ${path}`)
  log(`folder for ${branch} branch of ${repo} repository successfully created!`, 'success')
}
