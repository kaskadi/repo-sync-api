module.exports = ({ repo, branch }, lvl = 'root') => {
  const lvlLabels = ['root', 'repo', 'branch']
  const subPaths = [process.env.ROOT, repo, branch]
  return subPaths
    .slice(0, lvlLabels.indexOf(lvl) + 1)
    .join('/')
}
