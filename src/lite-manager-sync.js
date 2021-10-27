const _ = require("lodash");
const fs = require("fs-extra");
const shell = require('shelljs')
const Query = require('../build/sqlite-query-generator')
const { spawnSync } = require('child_process')
const path = require('path')

//check if sqlite3 shell is installed
if (!shell.which("sqlite3")) {
  console.log("sqlite3 is necessary for the program to work.")
  console.log("installing sqlite3...");
  shell.exec("pkg install sqlite -y")
  console.log("sqlite3 installed");
  shell.exit()
}

const liteSync = {
  sync: function(dir, table) {
    exports.dir = dir
    exports.name = table
    exports.all = new Query(dir)
    
    return liteSync
  },
  getAll: function(cb) {
    let q = `select * from ${require(path.resolve("src/lite-manager-sync.js")).name}`
    let val = require(path.resolve("src/lite-manager-sync.js")).all.run("select", q)
    const info = {
      rows: val,
      size: val.length
    }
    cb(info)
    return liteSync
  },
  getById: function(value, cb) {
    if (value) {} else { throw new Error("please inform the id") }
    let q = `select * from ${require(path.resolve("src/lite-manager-sync.js")).name} where id = ${value}`
    let val = require(path.resolve("src/lite-manager-sync.js")).all.run("select", q)
    const info = {
      rows: val,
      size: val.length
    }
    cb(info)
    return liteSync
  },
  getOne: function(where, cb) {
    if (where) {} else { throw new Error("please inform where you want to get the value") }
    let keys = _.keys(where);
    let val = require(path.resolve("src/lite-manager-sync.js")).all.run("select", `SELECT * FROM ${require(path.resolve("src/lite-manager-sync.js")).name} WHERE ${keys[0]} = ${where[keys[0]]}`)
    const info = {
      rows: val,
      size: val.length
    }
    cb(info)
    return liteSync
  },
  create: function(columms) {
    if (columms) {} else { throw new Error("columms cannot be null") }
    let into = _.keys(columms).join(",");
    let args = _.keys(columms);
    let values = [];
    for (let i = 0; i < args.length; i++) {
      values.push(`"${columms[args[i]]}"`);
    }
    require(path.resolve("src/lite-manager-sync.js")).all.run("create", `INSERT INTO ${require(path.resolve("src/lite-manager-sync.js")).name}(${into}) VALUES(${values})`)
    return liteSync
  },
  update: function(columms, where) {
    if (columms && where) {} else { throw new Error("columms and where you are going to update the table cannot be empty!") }
    let keys = _.keys(columms);
    let whereK = _.keys(where);
    for (let i = 0; i < keys.length; i++) {
      require(path.resolve("src/lite-manager-sync.js")).all.run(
        "update", `UPDATE ${require(path.resolve("src/lite-manager-sync.js")).name} SET "${keys[i]}" = "${columms[keys[i]]}" WHERE "${
            whereK[0]
            }" = "${where[whereK[0]]}"`
      );
    }
    return liteSync
  },
  delete: function(where) {
    if (where) {} else { throw new Error("please inform where you will delete the value") }
    let finalD = _.keys(where);
    require(path.resolve("src/lite-manager-sync.js")).all.run(
      "delete", `DELETE FROM ${require(path.resolve("src/lite-manager-sync.js")).name} WHERE ${finalD[0]} = "${where[finalD[0]]}"`
    );
    return liteSync
  }
}
//const sync = liteSync.sync(path.resolve("src/test.db"), "logs")
/*
sync.create({ name: "Otoniel" }).update({name:"Null"},{name:"Otonie56"}).getAll(cb => {
  console.log(cb);
})
*/

module.exports = liteSync.sync