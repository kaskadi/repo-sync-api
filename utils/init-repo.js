const exec = require('./exec.js')

module.exports = (deployPath) => {
  console.log('INFO: first synchronization request detected, creating deployment folder...')
  exec(`mkdir ${deployPath}`)
  console.log(`SUCCESS: deployment folder created @ ${deployPath}`)
}
