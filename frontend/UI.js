//Importando servicios 
import BookService from './services/BookService'; //Se importa el servicio del libro
const bookService = new BookService();

//Toma la fecha y la formatea
import { format } from 'timeago.js';

//Se encargará de manipular al DOM para poder mantener el codigo
class UI {

  //Renderiza los libros
  async renderBooks() {
    const books = await bookService.getBooks();
    const booksCardContainer = document.getElementById('books-cards');
    booksCardContainer.innerHTML = '' //Limpia el contenedor
    books.forEach(book => {
      const div = document.createElement('DIV');

      //Agregar clases
      div.className = '';
      //Que contendra dentro del div
      div.innerHTML = `
      <div class="card my-3">
        <div class="row p-4">
          <div class="col-md-4 py-2 d-flex justify-content-center align-items-center">
            <img src="${book.imagePath}" alt="" class="img-fluid w-100"/>
          </div>
          <div class="col-md-8 d-flex justify-content-between">
            <div class="d-flex flex-column justify-content-between align-items-sm-start">
              <h2 class="font-weight-bold">${book.title}</h2>
              <h5>${book.author}</h5>
              <span class="text-justify">${book.description}</span>
              <a href="#" class="btn btn-danger px-5 font-weight-bold delete" _id="${book._id}">Delete</a>
            </div>
          </div>
        </div>
        <div class="card-footer text-center bg-secondary">
          <p>${format(book.created_at)}</p>
        </div>
      </div>
      `;
      //Cada vez que recorra y agregue una trajeta, agregar al container
      booksCardContainer.appendChild(div);
    });
  }

  //Añade un nuevo book
  async addNewBook(book) {
    //Se le envia el book porque tiene los datos completos - le mando al metodo de la clase BookService
    await bookService.postBook(book);
    this.clearBookForm();
    this.renderBooks();
  }
  
  //Limpia el formulario
  clearBookForm() {
    //Limpia el formulario
    document.getElementById('book-form').reset();
  }

  //Mesaje si agregamos o eliminamos
  renderMessage(message, colorMessage, secondsToRemove) {
    const div = document.createElement('DIV');
    div.classList = `alert alert-${colorMessage} font-weight-bold animate__animated animate__fadeIn message`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.col-md-4');
    const bookForm = document.getElementById('book-form');

    container.insertBefore(div, bookForm);

    setTimeout(() => {
      document.querySelector('.message').remove();
    }, secondsToRemove)
  }
  
  //Elimina libros
  async deleteBook(bookId) {
    await bookService.deleteBook(bookId);
    this.renderBooks();
  }  
}

export default UI;