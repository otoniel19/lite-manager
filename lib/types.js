const types = {}
const fs = require('fs')

//types of values

types.base64 = function(path) {
  var b64Str = ''
  var str = fs.readFileSync(path)
  b64Str = str.toString('base64')
  return b64Str
}

types.text = function() {
  return "TEXT NOT NULL"
}

types.real = function() {
  return "REAL NOT NULL"
}

types.blob = function() {
  return "BLOB NOT NULL"
}

types.integer = function() {
  return "INTEGER NOT NULL"
}

module.exports = types