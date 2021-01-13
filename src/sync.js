const buildStructure = require('./build-structure.js')
const clone = require('./clone.js')
const pull = require('./pull.js')
const postPull = require('./post-pull.js')
const chown = require('./chown.js')
const deploy = require('./deploy')

module.exports = (repoData) => {
  const { repo, branch } = repoData
  const uri = `https://${process.env.GH_OAUTH_TOKEN}:x-oauth-basic@github.com/${process.env.ORG}/${repo}.git`
  const cwd = process.cwd()
  const structureData = buildStructure(repoData)
  if (!structureData.pop().isCreated) {
    clone(repoData, uri)
    if (branch !== 'master') {
      pull(repoData, uri)
    }
  } else {
    pull(repoData, uri)
  }
  postPull(repoData)
  chown(repoData)
  deploy(repoData)
  process.chdir(cwd)
}
