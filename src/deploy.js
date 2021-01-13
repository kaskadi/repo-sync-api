const exec = require('../utils/exec.js')
const getWd = require('../utils/get-wd.js')
const log = require('../utils/logger.js')
const buildStructure = require('./build-structure.js')

module.exports = (repoData) => {
  const deployDir = getWd(repoData, { lvl: 'branch', isTmp: false })
  const tmpDir = getWd(repoData, { lvl: 'branch' })
  buildStructure(repoData, false)
  log(`Moving all files into deployment folder at ${deployDir}`, 'info')
  exec(`mv ${tmpDir} ${deployDir}`)
  log('Successfully deployed project!', 'success')
}
