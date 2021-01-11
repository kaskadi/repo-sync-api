const exec = require('./exec.js')

module.exports = (repo, branch, uri, wd) => {
  process.chdir(wd)
  console.log(`INFO: folder for ${branch} branch of ${repo} repository does not exists, creating...`)
  exec(`git clone ${uri}`)
  exec(`mv ${repo} ${branch}`)
  console.log(`SUCCESS: folder for ${branch} branch of ${repo} repository successfully created!`)
}
