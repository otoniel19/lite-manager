const lite = require("dblite");
const _ = require("lodash");
const fs = require("fs-extra");

class run {
  constructor(dir) {
    if (fs.existsSync(dir)) {
      this.c = lite(die);
    }
  }
  run(name) {
    if (name.startsWith("CREATE")) {
      this.c.query(name).close();
    } else if (name.startsWith("SELECT")) {
      return new Promise((resolve, reject) => {
        this.c
          .query(name, (err, data) => {
            resolve(data);
          })
          .close();
      });
    }
  }
}

module.exports = run