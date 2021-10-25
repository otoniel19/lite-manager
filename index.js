const _ = require("lodash");
const fs = require("fs-extra");
const shell = require('shelljs')
const Query = require('./build/sqlite-query-generator')

//check if sqlite3 shell is installed
if (!shell.which("sqlite3")) {
  console.log("sqlite3 is necessary for the program to work.")
  console.log("installing sqlite3...");
  shell.exec("pkg install sqlite -y")
  console.log("sqlite3 installed");
  shell.exit()
}

class lite {
  constructor(dir) {
    try {
      if (dir == ":memory:") {
        this.all = new Query(dir)
      } else {
        if (fs.existsSync(dir)) {
          this.all = new Query(dir)
        } else {
          throw new Error("the database path does no exists!")
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  connect(name, columms) {
    try {
      if (name && columms) {} else { throw new Error("table name and columms of table cannot be null ") }

      const args = _.keys(columms);
      var values = [];
      for (let i = 0; i < args.length; i++) {
        values.push(`${args[i]} ${columms[args[i]]["type"]}`);
      }
      this.all.run(
        "table", `CREATE TABLE IF NOT EXISTS ${name}(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,${values})`
      );
      return {
        getAll: () => {
          return new Promise((resolve, reject) => {
            resolve(this.all.run("select", `SELECT * FROM ${name}`))
          });
        },
        getById: (value) => {
          if (value) {} else { throw new Error("please inform the id") }
          return new Promise((resolve, reject) => {
            resolve(this.all.run("select", `SELECT * FROM ${name} WHERE id = ${value}`))
          });
        },
        getOne: (where) => {
          if (where) {} else { throw new Error("please inform where you want to get the value") }
          return new Promise((resolve, reject) => {
            let keys = _.keys(where);
            resolve(this.all.run(
              "select", `SELECT * FROM ${name} WHERE "${keys[0]}" = "${where[keys[0]]}"`,
            ))
          });
        },
        create: (columms) => {
          if (columms) {} else { throw new Error("columms cannot be null") }
          let into = _.keys(columms).join(",");
          let args = _.keys(columms);
          let values = [];
          for (let i = 0; i < args.length; i++) {
            values.push(`"${columms[args[i]]}"`);
          }
          this.all.run("create",`INSERT INTO ${name}(${into}) VALUES(${values})`);
        },
        update: (columms, where) => {
          if (columms && where) {} else { throw new Error("columms and where you are going to update the table cannot be empty?  :") }
          let keys = _.keys(columms);
          let whereK = _.keys(where);
          for (let i = 0; i < keys.length; i++) {
            this.all.run(
              "update",`UPDATE ${name} SET ${keys[i]} = "${columms[keys[i]]}" WHERE ${
            whereK[0]
            } = ${where[whereK[0]]}`
            );
          }
        },
        delete: (where) => {
          if (where) {} else { throw new Error("please inform where you will delete the value") }
          let finalD = _.keys(where);
          this.all.run(
            "delete",`DELETE FROM ${name} WHERE ${finalD[0]} = ${where[finalD[0]]}`
          );
        },
      };
    } catch (e) {
      console.log(e)
    }
  }
}


//old 
/*

const sql = new lite("./tmp.db");
const tabela = sql.connect("nome", {
  nome: {
    type: "TEXT",
    model: String,
  },
});
*/

/*
tabela.getAll().then((data) => {
  console.log(data);
});
*/

/*
tabela.create({
    nome: "Rafael"
})
*/

/*
tabela.getById(1).then(data => {
  console.log(data);
});
*/

/*
tabela.getOne({nome: "Otoniel"}).then(data => {
    console.log(data);
})
*/

/*
tabela.update({nome: "Daniel",},{id: 2})
*/

/*
tabela.delete({id: 2})
*/

module.exports = {
  lite: lite,
  types: require("./lib/types"),
  //run: require("./lib/run")
}