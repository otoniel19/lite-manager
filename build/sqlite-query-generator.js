const { spawnSync } = require("child_process")
const { resolve } = require("path")

class Query {
  constructor(path) {
    this.path = path
  }
  run(type, args) {
    if (type == "table") {
      const str = spawnSync("sqlite3", [this.path, `${args};`, ".exit"])
      const std = str.stderr.toString() != '' ? str.stderr.toString() : str.stdout.toString()
      console.log(std);
    } else if (type == "create") {
      const str = spawnSync("sqlite3", [this.path, `${args};`, ".exit"])
      const std = str.stderr.toString() != '' ? str.stderr.toString() : str.stdout.toString()
      console.log(std);
    } else if (type == "select") {
      const str = spawnSync("sqlite3", [this.path, `.mode json`, `${args};`, ".exit"])
      //const std = str.stderr.toString() != '' ? str.stderr.toString() : str.stdout.toString()
      if (str.stderr.toString() != '') {
        console.log(str.stderr.toString());
        return
      } else {
        const res = JSON.parse(str.stdout.toString())
        return res
      }
    } else if (type == "update") {
      const str = spawnSync("sqlite3", [this.path, `${args};`, ".exit"])
      if (str.stderr.toString() != '') {
        console.log(str.stderr.toString());
        return
      }
    } else if (type == "delete") {
      const str = spawnSync("sqlite3", [this.path, `${args};`, ".exit"])
      if (str.stderr.toString() != '') {
        console.log(str.stderr.toString());
        return
      }
    }
  }
}

//Query('./build/test.db',"table","create table logs(name text,date text)"
//Query('./build/test.db',"create",`insert into logs(name,date) values("Hello World!!","${Date()}")`
//console.log(Query('./build/test.db', "select", `select * from logs`))
//Query('./build/test.db',"update",`update logs set nome = "Hello World!!! where name = "Hello World!"`)
//Query("./build/test.db","delete",`delete from logs where name = "Hello World!"`)

module.exports = Query