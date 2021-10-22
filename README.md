# lite-manager sqlite database manager
# create a table 
```
const lite = require("lite-manager")
const sql = new lite.lite("./tmp.db").lite("./tmp.db");
const table = sql.connect("tname", {
  name: {
    type: "TEXT",
    model: String,
  },
});
````
# insert into a table
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const table = sql.connect("tname", {
   name: {
     type: "TEXT",
     model: String,
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
     type: "TEXT",
     model: String,
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
     type: "TEXT",
     model: String,
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
     type: "TEXT",
     model: String,
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
     type: "TEXT",
     model: String,
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
     type: "TEXT",
     model: String,
   },
 });
 table.delete({id: 1})
```
# aditional

# add a base64 str
```
const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const table = sql.connect("tname", {
   file: {
     type: "TEXT",
     model: String,
   },
 });
 const liteTypes = lite.types
 table.create({
   file: liteTypes.base64("./example_img.png")
 })
```
* note you can add anything in base64

# table models

# text
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const liteTypes = lite.types
 const table = sql.connect("tname", {
   file: {
     type: liteTypes.text(),
     model: String,
   },
 });
```
# string 
```
 const lite = require("lite-manager")
 const sql = new lite.lite("./tmp.db")("./tmp.db");
 const liteTypes = lite.types
 const table = sql.connect("tname", {
   file: {
     type: liteTypes.string(),
     model: String,
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
     type: liteTypes.integer(),
     model: String,
   },
 });
```



# bye bye!