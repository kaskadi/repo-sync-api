module.exports = ({ repo, branch }, opts = {}) => {
  const defaultOpts = Object.freeze({
    lvl: 'root',
    isTmp: true
  })
  opts = { ...defaultOpts, ...opts }
  const { lvl, isTmp } = opts
  const root = isTmp ? process.env.TMP_ROOT : process.env.ROOT
  const lvlLabels = ['root', 'repo', 'branch']
  const subPaths = [root, repo, branch]
  return subPaths
    .slice(0, lvlLabels.indexOf(lvl) + 1)
    .join('/')
}
