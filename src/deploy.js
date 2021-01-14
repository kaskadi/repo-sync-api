const exec = require('../utils/exec.js')
const getWd = require('../utils/get-wd.js')
const log = require('../utils/logger.js')
const cleanup = require('../utils/cleanup.js')
const buildStructure = require('./build-structure.js')

const { readFileSync, existsSync } = require('fs')

module.exports = (repoData) => {
  const deployDir = getWd(repoData, { lvl: 'branch', isTmp: false })
  const tmpDir = getWd(repoData, { lvl: 'branch' })
  buildStructure(repoData, false)
  log(`Moving all files into deployment folder at ${deployDir}`, 'info')
  exec(`rsync -avz ${tmpDir}/ ${deployDir}`)
  cleanup([getWd(repoData, { lvl: 'repo' })])
  start(deployDir)
}

function start (deployDir) {
  process.chdir(deployDir)
  if (existsSync('package.json')) {
    const { scripts } = JSON.parse(readFileSync('package.json', 'utf8'))
    if (scripts.start) {
      log('npm start script detected, starting the deployed application...', 'info')
      exec('npm start', true)
    }
  }
}
