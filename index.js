const express = require('express')
const app = express()
const port = 4000

const sync = require('./utils/sync.js')

require('dotenv').config()

app.use(express.json())
app.use(require('./utils/authorizer.js'))

app.set('trust proxy', true) // this allows us to retrieve the client IP via req.ip

app.get('/:repo', (req, res) => {
  const { params, query, ip } = req
  const { repo } = params
  const { branch } = query
  console.log('***************')
  console.log(`Received a synchronization request from ${ip}`)
  console.log('***************')
  sync(repo, branch)
  res.json({ message: `Successfully synchronized kaskadi/${repo}!` })
})

app.listen(port, () => {
  console.log(`Remote sync API online @ http://localhost:${port}`)
})
