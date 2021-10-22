const _ = require("lodash");
const dblite = require("dblite");
const fs = require("fs-extra");
const shell = require('shelljs')

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
        this.all = dblite(dir)
      } else {
        if (fs.existsSync(dir)) {
          this.all = dblite(dir)
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
      var types = [];
      var modelo = {
        id: Number,
        createdAt: String,
        updatedAt: String
      };
      for (let i = 0; i < args.length; i++) {
        values.push(`${args[i]} ${columms[args[i]]["type"]}`);
        types.push({
        [args[i]]: columms[args[i]]["model"]
        });
      }
      if (values.length > 0 && types.length > 0) {
        for (let i = 0; i < types.length; i++) {
          modelo[args[i]] = types[i][args[i]];
        }
      }
      this.all.query(
        `CREATE TABLE IF NOT EXISTS ${name}(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,${values},createdAt TEXT NOT NULL,updatedAt TEXT NOT NULL)`
      );
      return {
        getAll: () => {
          return new Promise((resolve, reject) => {
            this.all.query(`SELECT * FROM ${name}`, modelo, data => {
              resolve(data)
            });
          });
        },
        getById: (value) => {
          if (value) {} else { throw new Error("please inform the id") }
          return new Promise((resolve, reject) => {
            this.all.query(`SELECT * FROM ${name} WHERE id = ${value}`, modelo, data => {
              resolve(data)
            })
          });
        },
        getOne: (where) => {
          if (where) {} else { throw new Error("please inform where you want to get the value") }
          return new Promise((resolve, reject) => {
            let keys = _.keys(where);
            this.all.query(
              `SELECT * FROM ${name} WHERE "${keys[0]}" = "${where[keys[0]]}"`,
              modelo, data => {
                resolve(data)
              }
            )
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
          this.all.query(`INSERT INTO ${name}(${into}) VALUES(${values})`);
          this.all.query(`INSERT INTO ${name}(createdAt,updatedAt) VALUES("${Date.now()}","${Date.now()}")`)
        },
        update: (columms, where) => {
          if (columms && where) {} else { throw new Error("columms and where you are going to update the table cannot be empty?  :") }
          let keys = _.keys(columms);
          let whereK = _.keys(where);
          this.all.query(`UPDATE ${name} SET updatedAt = "${Date.now()}" WHERE ${whereK[0]} = ${where[whereK[0]]}`)

          this.all.query(`BEGIN TRANSACTION`);
          for (let i = 0; i < keys.length; i++) {
            this.all.query(
              `UPDATE ${name} SET ${keys[i]} = "${columms[keys[i]]}" WHERE ${
            whereK[0]
            } = ${where[whereK[0]]}`
            );
          }
          this.all.query("COMMIT");
        },
        delete: (where) => {
          if (where) {} else { throw new Error("please inform where you will delete the value") }
          let finalD = _.keys(where);
          this.all.query(
            `DELETE FROM ${name} WHERE ${finalD[0]} = ${where[finalD[0]]}`
          );
        },
      };
    } catch (e) {
      console.log(e)
    }
  }
}

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
  run: require("./lib/run"),
  close: require("./lib/close")
}