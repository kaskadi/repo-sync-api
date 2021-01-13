const { existsSync } = require('fs')
const exec = require('../utils/exec.js')
const log = require('../utils/logger.js')
const getWd = require('./get-wd.js')

module.exports = (repoData) => {
  process.chdir(getWd(repoData)) // goes to root
  log('Checking folder structure before synchronizing repository data...', 'info')
  const structureData = checkStructure(getWd(repoData, { lvl: 'branch' }))
  log('Folder structure successfully checked!', 'success')
  log('Creating missing folders in structure before synchronizing repository data...', 'info')
  createFolders(structureData)
  log('Successfully created all missing folders!', 'success')
  return structureData
}

function checkStructure (path) {
  const folders = path.split('/')
  return folders
    .map((folder, i) => {
      const folderPath = folders
        .slice(0, i + 1)
        .join('/')
      return {
        path: folderPath,
        isCreated: existsSync(path)
      }
    })
}

function createFolders (structureData) {
  structureData.forEach((data, i) => {
    const { path, isCreated } = data
    if (i !== structureData.length - 1 && !isCreated) {
      exec(`mkdir ${path}`)
    }
  })
}
