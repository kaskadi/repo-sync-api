module.exports = (req, res, next) => {
  const { headers } = req
  const { authorization } = headers
  if (!authorization.startsWith('Bearer') || authorization.split(' ').pop() !== process.env.AUTH_TOKEN) {
    res.status(401).json({ error: 'Unauthorized access' })
  } else {
    next()
  }
}
