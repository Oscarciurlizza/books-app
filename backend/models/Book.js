const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  isbn: { type: String, required: true},
  imagePath: { type: String},
  created_at: { type: Date, default: Date.now } //default -> guarda la fecha actual en caso no se especifique la fecha
});

module.exports = model('Book', BookSchema); //Es decir el modelo lo podemos usar en las otras aplicaciones.