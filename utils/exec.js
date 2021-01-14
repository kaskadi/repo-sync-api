const { spawnSync, spawn } = require('child_process')

module.exports = (cmd, detached = false) => {
  const statements = cmd.split(' ')
  if (!detached) {
    spawnSync(statements[0], statements.slice(1), { stdio: 'inherit' })
  } else {
    const subprocess = spawn(statements[0], statements.slice(1), {
      detached: true,
      stdio: 'ignore'
    })
    subprocess.unref()
  }
}
