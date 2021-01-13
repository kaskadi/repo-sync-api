const { existsSync } = require('fs')
const exec = require('../utils/exec.js')
const log = require('../utils/logger.js')
const getWd = require('../utils/get-wd.js')

module.exports = (repoData, isTmp = true) => {
  const { repo, branch } = repoData
  const rootPath = getWd(repoData, { isTmp })
  process.chdir(rootPath)
  log(`Checking folder structure in ${rootPath} before synchronizing repository data...`, 'info')
  const structureData = checkStructure(`${repo}/${branch}`)
  log(`Folder structure successfully checked in ${rootPath}!`, 'success')
  log(`Creating missing folders in ${rootPath} before synchronizing repository data...`, 'info')
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
