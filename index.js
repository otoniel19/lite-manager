const _ = require("lodash");
const dblite = require("dblite");
const fs = require("fs-extra");

class lite {
  constructor(dir) {
    try {
      if (dir && fs.existsSync(dir)) {
        this.all = dblite(dir);
      } else {
        throw new Error("the database path does no exists!");
      }
    } catch (e) {
      console.log(e);
    }
  }
  connect(name, columms) {
    const args = _.keys(columms);
    var values = [];
    var types = [];
    var modelo = { id: Number };
    for (let i = 0; i < args.length; i++) {
      values.push(`${args[i]} ${columms[args[i]]["type"]}`);
      types.push({ [args[i]]: columms[args[i]]["model"] });
    }
    if (values.length > 0 && types.length > 0) {
      for (let i = 0; i < types.length; i++) {
        modelo[args[i]] = types[i][args[i]];
      }
    }
    this.all.query(
      `CREATE TABLE IF NOT EXISTS ${name}(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,${values})`
    );
    return {
      getAll: () => {
        return new Promise((resolve, reject) => {
          resolve(this.all.query(`SELECT * FROM ${name}`, modelo));
        });
      },
      getById: (value) => {
        return new Promise((resolve, reject) => {
          resolve(
            this.all.query(`SELECT * FROM ${name} WHERE id = ${value}`, modelo)
          );
        });
      },
      getOne: (where) => {
        return new Promise((resolve, reject) => {
          let keys = _.keys(where);
          resolve(
            this.all.query(
              `SELECT * FROM ${name} WHERE "${keys[0]}" = "${where[keys[0]]}"`,
              modelo
            )
          );
        });
      },
      create: (columms) => {
        let into = _.keys(columms).join(",");
        let args = _.keys(columms);
        let values = [];
        for (let i = 0; i < args.length; i++) {
          values.push(`"${columms[args[i]]}"`);
        }
        this.all.query(`INSERT INTO ${name}(${into}) VALUES(${values})`);
      },
      update: (columms, where) => {
        let keys = _.keys(columms);
        let whereK = _.keys(where);
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
        let finalD = _.keys(where);
        this.all.query(
          `DELETE FROM ${name} WHERE ${finalD[0]} = ${where[finalD[0]]}`
        );
      },
    };
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
    lite: lite//,
    //run: require("./lib/run")
}