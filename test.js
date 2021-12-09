const lite = require('./index')
const db = new lite.lite(":memory:",{getType:'callback'}).connect('O',{
  str:{type:"TEXT"}
})

db.create({str:"Oi"}).delete({str:"Oi"})