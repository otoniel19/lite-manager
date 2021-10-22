module.exports = function(code) {
  if (code) {
    const shell = require("shelljs")
    setTimeout(() => { shell.exit(code) }, 5000)
  } else {
    setTimeout(() => { shell.exit() }, 5000)
  }
}