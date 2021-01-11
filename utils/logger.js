module.exports = (msg, lvl) => {
  const time = new Date().toLocaleString()
  console.log(`[${time}] ${lvl ? `${lvl.toUpperCase()}: ` : ''}${msg}`)
}
