const { existsSync, readFileSync } = require('fs')

const exec = require('../utils/exec.js')
const log = require('../utils/logger.js')
const getWd = require('./get-wd.js')

const postPullHandlers = {
  js: () => {
    log('installing all npm dependencies...', 'info')
    exec('npm i')
    log('successfully installed all dependencies!', 'success')
    const { scripts } = JSON.parse(readFileSync('package.json', 'utf8'))
    if (scripts.build) {
      log('this project seems to contain a build script, executing it...', 'info')
      exec('npm run build')
      log('build script successfully executed!', 'success')
    }
  }
}

module.exports = (repoData) => {
  process.chdir(getWd(repoData, { lvl: 'branch' }))
  log('checking repository type...', 'info')
  const repoType = checkRepoType()
  if (!postPullHandlers[repoType]) {
    log('this repository type does not have any associated post-pull operations to perform', 'info')
  } else {
    log(`repository seems to be of type ${repoType}...`, 'info')
    postPullHandlers[repoType]()
  }
}

function checkRepoType () {
  if (existsSync('package.json')) {
    return 'js'
  }
  return null
}
