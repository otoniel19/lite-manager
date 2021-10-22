const types = {}
const fs = require('fs')

types.base64 = function(path) {
  var b64Str = ''
  var str = fs.readFileSync(path)
  b64Str = str.toString('base64')
  return b64Str
}

types.text = function() {
  return "TEXT NOT NULL"
}

types.string = function() {
  return "STRING NOT NULL"
}

types.integer = function() {
  return "INTEGER NOT NULL"
}

module.exports = types