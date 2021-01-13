const exec = require('../utils/exec.js')
const getWd = require('../utils/get-wd.js')
const log = require('../utils/logger.js')
const cleanup = require('../utils/cleanup.js')
const buildStructure = require('./build-structure.js')

module.exports = (repoData) => {
  const deployDir = getWd(repoData, { lvl: 'branch', isTmp: false })
  const tmpDir = getWd(repoData, { lvl: 'branch' })
  buildStructure(repoData, false)
  log(`Moving all files into deployment folder at ${deployDir}`, 'info')
  exec(`rsync -a ${tmpDir}/ ${deployDir}/`)
  cleanup([getWd(repoData, { lvl: 'repo' })])
}
