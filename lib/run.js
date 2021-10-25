/*
const db = require('dblite')
const fs = require('fs')

//run Sqlite3 query

class Run {
  constructor(path) {
    try {
      if (path) {
        if (path != ':memory:' && fs.existsSync(path)) {
          this.conn = db(path)
        } else {
          this.conn = db(':memory:')
        }
      } else {
        throw new Error('database no exists')
      }
    } catch (e) {
      console.log(e)
    }
  }
  run(q) {
    try {
      if (q) {

        var cmd = q.toLowerCase()

        if (cmd.startsWith("create")) {
          this.conn.query(cmd)
        } else if (cmd.startsWith('select')) {
          return new Promise((res, rej) => {
            this.conn.query(cmd, cb => {
              res(cb)
            })
          })
        } else if (cmd.startsWith('update')) {
          this.conn.query(cmd)
        } else if (cmd.startsWith('delete')) {
          this.conn.query(cmd)
        } else if (cmd.startsWith('insert')) {
          this.conn.query(cmd)
        } else {
          this.conn.query(cmd)
        }

      } else {
        throw new Error('query value cannot be empty')
      }
    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = Run
*/