# lite-manager sqlite database manager
# create a table 
```
const sql = new lite("./tmp.db");
const table = sql.connect("tname", {
  name: {
    type: "TEXT",
    model: String,
  },
});
````
# insert into a table
```
 const sql = new lite("./tmp.db");
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
 const sql = new lite("./tmp.db");
 const table = sql.connect("tname", {
   name: {
     type: "TEXT",
     model: String,
   },
 });
 table.findAll().then(data => {
   console.log(data)
 })
```
# get values by id
```
 const sql = new lite("./tmp.db");
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
 const sql = new lite("./tmp.db");
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
 const sql = new lite("./tmp.db");
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
 const sql = new lite("./tmp.db");
 const table = sql.connect("tname", {
   name: {
     type: "TEXT",
     model: String,
   },
 });
 table.delete({id: 1})
```
# bye bye!