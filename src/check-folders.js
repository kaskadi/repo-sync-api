const { existsSync } = require('fs')
const exec = require('../utils/exec.js')
const log = require('../utils/logger.js')

module.exports = (path, wd) => {
  log('Checking folder structure before synchronizing repository data...', 'info')
  process.chdir(wd)
  const parts = path.split('/')
  let structureExists = []
  for (const part of parts) {
    if (!existsSync(getFolderPath(parts, part))) {
      if (parts.indexOf(part) !== parts.length - 1) {
        exec(`mkdir ${getFolderPath(parts, part)}`)
      }
      structureExists = [...structureExists, false]
    } else {
      structureExists = [...structureExists, true]
    }
  }
  log('Folder structure successfully updated!', 'success')
  return structureExists
}

function getFolderPath (parts, part) {
  return parts.slice(0, parts.indexOf(part) + 1).join('/')
}
