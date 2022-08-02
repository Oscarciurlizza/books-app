//Sirve para definir rutas del servidor
const { Router } = require('express');
const router = Router();

//Modulo para saber la existencia de archivos (eliminar)
const { unlink } = require('fs-extra');
const path = require('path');

const Book = require('../models/Book');

router.get('/', async (req, res) => {
  const books = await Book.find(); //Consulta los libros y se guarda en const
  res.json(books);
});

router.post('/', async (req, res) => {
  const { title, author, description, isbn } = req.body; //Guarda datos enviados
  const imagePath = '/upload/' + req.file.filename //Almacena donde esta almacenada la imagen (concatena el nombre de la imagen)
  const newBook = new Book({ title, author, description, isbn, imagePath });
  await newBook.save(); //Guarda en la BD
  res.json({message: 'Book Saved'});
});


router.delete('/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id); //Consigue el id del libro y lo elimina
  //Eliminando imagenes
  unlink(path.resolve('./backend/public' + book.imagePath)); //Elimina imagenes de la carpeta public
  res.json({message: 'Book Deleted'});
} )

module.exports = router;