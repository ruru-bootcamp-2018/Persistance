var bcrypt = require('bcrypt')

function generate(password, cb) {
  bcrypt.hash(password, 12, cb)
}

function generateSync(password) {
  return bcrypt.hashSync(password, 12)
}

function compare (password, hash, cb) {
  bcrypt.compare(password, hash, cb)
}

module.exports = {
  generate,
  compare,
  generateSync
}
