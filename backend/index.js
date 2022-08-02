//Condicional para validar si los modulos que necesitamos en produccion
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); //Nos permite leer nuestras variables de entorno
}

//Módulos obligatorios
const express = require('express'); //Framework de NodeJs
const morgan = require('morgan'); //Ver por consola lo que las aplicaciones cliente piden
const multer = require('multer'); //Sirve para procesar imagenes - ENTENDER IMAGENES QUE SUBAN AL SERVER
const path = require('path'); //Utilizar la direccion actual de proyecto - crea carpetas
const cors = require('cors'); //Permitir que dos servidores se puedan comunicar

//Inicializaciones
const app = express(); //app -> es el servidor
require('./database');

//Configuración
app.set('port', process.env.PORT || 3000); //Gracias a eso validamos para el puerto de HEROKU

//Middlewares - Todos los middlewares son funciones.
app.use(morgan('dev'));

const storage = multer.diskStorage({ //Configuraciones de multer - Middlewares
  destination: path.join(__dirname, 'public/upload'), //dirname -> nos da la direccion de donde se ejecuta
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
   }
})

app.use(multer({storage}).single('image')); //single -> porque solo se subirá una img - image -> input que supervisará si se subió
app.use(express.urlencoded({extended: false})); //Interpreta datos del formulario del front
app.use(express.json()); //Interpreta peticiones ajax que envien al servidor (cuando envien un JSON sin ningun form) POSTMAN
app.use(cors());

//Routes
app.use('/api/books', require('./routes/books'));

//Static files - dar acceso a carpetas estaticas
app.use(express.static(path.join(__dirname, 'public'))); //Carpeta public será una carpta publica

//Iniciando el servidor.
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});