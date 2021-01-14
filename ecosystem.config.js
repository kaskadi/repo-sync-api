// pm2 config file
module.exports = {
  apps: [{
    name: 'repo-sync-api',
    script: './index.js',
    watch: false, // do not watch since start script handles clean restart
    treekill: false, // do not kill detached child processes
    exec_mode: 'cluster',
    instances: 1
  }]
}
