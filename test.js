const { lite , types } = require('./index')
const db = new lite(':memory:')

const model = db.connect('test',{
  name: {
    type: types.text()
  }
})