const { spawnSync } = require('child_process')

module.exports = (cmd) => {
  const statements = cmd.split(' ')
  spawnSync(statements[0], statements.slice(1), { stdio: 'inherit' })
}
