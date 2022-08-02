const moongose = require('mongoose');

//Requerir variables de entorno
console.log(process.env.MONGODB_URI)

moongose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err))