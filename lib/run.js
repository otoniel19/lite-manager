const { spawnSync } = require("child_process")
const _ = require('lodash')
const fs = require('fs')
const { resolve } = require('path')

class Run {
  constructor(dir) {
    if (dir != ':memory:') {
      if (fs.existsSync(dir)) {
        this.conn = "OK"
        this.dir = dir
      } else {
        this.conn = "BAD"
      }
    } else {
      this.conn = "OK"
      this.dir = ':memory:'
    }
  }
  run(q, cb) {
    if (this.conn == "OK") {

      const _2Query = _.toLower(q)
      if (_.startsWith(_2Query, "select")) {
        let RQuery = spawnSync("sqlite3", [this.dir, ".mode json", `${q};`, ".exit"])
        return JSON.parse(RQuery.stdout.toString())
      } else {
        let RQuery = spawnSync("sqlite3", [this.dir, `${q};`, ".exit"])
        const std = RQuery.stderr.toString() != '' ? RQuery.stderr.toString() : ''
        return console.log(std);
      }

    } else {
      console.error("ERROR BAD CONNECTION")
    }
  }
}

module.exports = Run