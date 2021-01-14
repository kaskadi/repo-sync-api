const express = require('express')
const app = express()
const port = 4000

const log = require('./utils/logger.js')
const init = require('./utils/init.js')
const sync = require('./src/sync.js')
const deploy = require('./src/deploy.js')

require('dotenv').config()

app.use(express.json())
app.use(require('./middlewares/authorizer.js'))

app.set('trust proxy', true) // this allows us to retrieve the client IP via req.ip

app.get('/:repo', (req, res) => {
  const { params, query, ip } = req
  const { repo } = params
  let { branch } = query
  branch = branch || 'master'
  console.log('***************')
  log(`Received a synchronization request from ${ip} for ${branch} branch of ${repo}...`)
  console.log('***************')
  const repoData = { repo, branch }
  sync(repoData)
  res.json({ message: `Successfully synchronized kaskadi/${repo}!` })
  deploy(repoData)
})

app.listen(port, () => {
  console.log('***************')
  console.log('testing!')
  log('Starting repository synchronization API...', 'info')
  console.log('***************')
  init()
  log(`Remote sync API started @ http://localhost:${port}`)
})
