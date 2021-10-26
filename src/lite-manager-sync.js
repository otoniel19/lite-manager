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
    return {
      getAll: this.getAll,
      getOne: this.getOne,
      getById: this.getById,
      create: this.create,
      update: this.update,
      delete: this.delete
    }
  },
  getAll: function(cb) {
    let q = `select * from ${require(path.resolve("src/lite-manager-sync.js")).name}`
    let val = require(path.resolve("src/lite-manager-sync.js")).all.run("select", q)
    const info = {
      rows: val,
      size: val.length
    }
    cb(info)
    return {
      getById: this.getById,
      getOne: this.getOne,
      getAll: this.getAll,
      create: this.create,
      delete: this.delete,
      update: this.update
    }
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
    return {
      getById: this.getById,
      getOne: this.getOne,
      getAll: this.getAll,
      create: this.create,
      delete: this.delete,
      update: this.update
    }
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
    return {
      getById: this.getById,
      getOne: this.getOne,
      getAll: this.getAll,
      create: this.create,
      delete: this.delete,
      update: this.update
    }
  },
  create: function(columms) {
    if (columms) {} else { throw new Error("columms cannot be null") }
    let into = _.keys(columms).join(",");
    let args = _.keys(columms);
    let values = [];
    for (let i = 0; i < args.length; i++) {
      values.push(`"${columms[args[i]]}"`);
    }
    require(path.resolve("src/lite-manager-sync.js")).all.run("create", `INSERT INTO ${require(path.resolve("src/lite-manager-sync.js")).name}(${into}) VALUES(${values})`);
    return {
      getById: this.getById,
      getOne: this.getOne,
      getAll: this.getAll,
      create: this.create,
      delete: this.delete,
      update: this.update
    }
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
    return {
      getById: this.getById,
      getOne: this.getOne,
      getAll: this.getAll,
      create: this.create,
      delete: this.delete,
      update: this.update
    }
  },
  delete: function(where) {
    if (where) {} else { throw new Error("please inform where you will delete the value") }
    let finalD = _.keys(where);
    require(path.resolve("src/lite-manager-sync.js")).all.run(
      "delete", `DELETE FROM ${require(path.resolve("src/lite-manager-sync.js")).name} WHERE "${finalD[0]}" = "${where[finalD[0]]}"`
    );
    return {
      getById: this.getById,
      getOne: this.getOne,
      getAll: this.getAll,
      create: this.create,
      delete: this.delete,
      update: this.update
    }
  }
}
//const sync = liteSync.sync(path.resolve("src/test.db"), "logs")
/*
sync.create({ name: "Otoniel" }).update({name:"Null"},{name:"Otonie56"}).getAll(cb => {
  console.log(cb);
})
*/

module.exports = liteSync.sync