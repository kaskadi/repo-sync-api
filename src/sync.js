const { existsSync } = require('fs')

const initRepo = require('./init-repo.js')
const clone = require('./clone.js')
const pull = require('./pull.js')
const postPull = require('./post-pull.js')
const chown = require('./chown.js')

module.exports = (repo, branch = 'master') => {
  const uri = `https://${process.env.GH_OAUTH_TOKEN}:x-oauth-basic@github.com/${process.env.ORG}/${repo}.git`
  const cwd = process.cwd()
  const deployPath = `${process.env.ROOT}/${repo}`
  const branchPath = `${deployPath}/${branch}`
  if (!existsSync(deployPath)) {
    initRepo(deployPath)
  }
  if (!existsSync(branchPath)) {
    clone(repo, branch, uri, deployPath)
    if (branch !== 'master') {
      pull(repo, branch, uri, branchPath)
    }
  } else {
    pull(repo, branch, uri, branchPath)
  }
  postPull(branchPath)
  chown(branchPath)
  process.chdir(cwd)
}
