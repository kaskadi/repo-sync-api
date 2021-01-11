const exec = require('./exec.js')
const { existsSync, readFileSync } = require('fs')

const postPullHandlers = {
  js: () => {
    console.log('INFO: installing all npm dependencies...')
    exec('npm i')
    console.log('SUCCESS: successfully installed all dependencies!')
    const { scripts } = JSON.parse(readFileSync('package.json', 'utf8'))
    if (scripts.build) {
      console.log('INFO: this project seems to contain a build script, executing it...')
      exec('npm run build')
      console.log('SUCCESS: build script successfully executed!')
    }
  }
}

module.exports = (wd) => {
  process.chdir(wd)
  console.log('INFO: checking repository type...')
  const repoType = checkRepoType()
  if (!postPullHandlers[repoType]) {
    console.log('INFO: this repository type does have any associated post-pull operations to perform')
  } else {
    console.log(`INFO: repository seems to be of type ${repoType}...`)
    postPullHandlers[repoType]()
  }
}

function checkRepoType () {
  if (existsSync('package.json')) {
    return 'js'
  }
  return null
}
