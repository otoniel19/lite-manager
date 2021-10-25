# lite-manager sqlite database manager Made only by Otoniel19

[![npm version](https://img.shields.io/npm/v/lite-manager.svg?style=flat-square)](https://www.npmjs.com/package/lite-manager)
[![npm downloads](https://img.shields.io/npm/dm/lite-manager.svg?style=flat-square)](https://www.npmjs.com/package/lite-manager)
[![npm downloads](https://img.shields.io/npm/dw/lite-manager.svg?style=flat-square)](https://www.npmjs.com/package/lite-manager)

# Now you no longer need to inform the model because the self model program now!
# create a table 
```
const lite = require("lite-manager")
const sql = new lite.lite("./tmp.db").lite("./tmp.db");
const table = sql.connect("tname", {
  name: {
    type: "TEXT"
  },
});
````
# insert into a table
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const table = sql.connect("tname", {
   name: {
     type: "TEXT"
   },
 });
 table.create({
   name: "Hello World!"
 })
```
# get all values
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const table = sql.connect("tname", {
   name: {
     type: "TEXT"
   },
 });
 table.getAll().then(data => {
   console.log(data)
 })
```
# get values by id
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const table = sql.connect("tname", {
   name: {
     type: "TEXT"
   },
 });
 table.getById(1).then(data => {
   console.log(data)
 })
```
# get one value
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const table = sql.connect("tname", {
   name: {
     type: "TEXT"
   },
 });
 table.getOne({name: "Hello!"}).then(data => {
   console.log(data)
 })
```
# update value
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const table = sql.connect("tname", {
   name: {
     type: "TEXT"
   },
 });
 table.update({
   name: "Hello!"
 },{id: 1})
```
# delete value
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const table = sql.connect("tname", {
   name: {
     type: "TEXT"
   },
 });
 table.delete({id: 1})
```
# aditional

* note you can also use :memory: database

# add a base64 str
```
const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const table = sql.connect("tname", {
   file: {
     type: "TEXT",
   },
 });
 const liteTypes = lite.types
 table.create({
   file: liteTypes.base64("./example_img.png")
 })
```
* note you can add anything in base64

# table s

# text
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const liteTypes = lite.types
 const table = sql.connect("tname", {
   file: {
     type: liteTypes.text()
   },
 });
```
# real
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const liteTypes = lite.types
 const table = sql.connect("tname", {
   file: {
     type: liteTypes.real()
   },
 });
```
# integer
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const liteTypes = lite.types
 const table = sql.connect("tname", {
   file: {
     type: liteTypes.integer()
   },
 });
```
# blob
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const liteTypes = lite.types
 const table = sql.connect("tname", {
   file: {
     type: liteTypes.blob()
   },
 });
```
# run query
```
 const lite = require("lite-manager")
 const liteRun = lite.run
 const Run = new liteRun(":memory:")
 Run.run(".show")
```
* note is still in development
* removed by now

# bye bye!