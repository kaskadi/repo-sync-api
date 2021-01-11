const exec = require('./exec.js')

module.exports = (repo, branch, uri, wd) => {
  process.chdir(wd)
  console.log(`INFO: synchronizing ${branch} branch of ${repo} repository...`)
  exec(`git pull ${uri} ${branch}`)
  console.log(`SUCCESS: successfully synchronized ${branch} branch of ${repo} repository`)
}
