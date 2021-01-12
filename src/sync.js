const checkFolders = require('./check-folders.js')
const clone = require('./clone.js')
const pull = require('./pull.js')
const postPull = require('./post-pull.js')
const chown = require('./chown.js')

module.exports = (repo, branch = 'master') => {
  const uri = `https://${process.env.GH_OAUTH_TOKEN}:x-oauth-basic@github.com/${process.env.ORG}/${repo}.git`
  const cwd = process.cwd()
  const relPath = `${repo}/${branch}`
  const path = `${process.env.ROOT}/${relPath}`
  const folderExistence = checkFolders(relPath, process.env.ROOT)
  if (!folderExistence[folderExistence.length - 1]) {
    clone(repo, branch, uri, path)
    if (branch !== 'master') {
      pull(repo, branch, uri, path)
    }
  } else {
    pull(repo, branch, uri, path)
  }
  postPull(path)
  chown(path)
  process.chdir(cwd)
}
