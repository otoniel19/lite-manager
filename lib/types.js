const types = {}

types.fileB64 = function(path) {
  const fs = require('fs')
  var b64Str = ''
  var str = fs.readFileSync(path)
  b64Str = str.toString('base64')
  return b64Str
}

module.exports = types