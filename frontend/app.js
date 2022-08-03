//Requerimos los estilos
import './styles/app.css';
import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  ui.renderBooks();
})

document.getElementById('book-form')
  .addEventListener('submit', e => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    //Formulario virtual de js y se le envia data obtenida de inputs
    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);  
    formData.append('isbn', isbn);

    //Instanciando el UI
    const ui = new UI();

    //Metodos de UI - Validación de formulario
    if ([title,author,description, isbn, image].includes('')) {
      ui.renderMessage('Complete all the fields', 'warning', 3000);
    } else {
      ui.addNewBook(formData);
      ui.renderMessage('New Book Added', 'success', 3000);
    }
    e.preventDefault();
  })

  //Eliminando una libro
 document.getElementById('books-cards')
  .addEventListener('click', e => {
    //Si estoy presionando el boton con la clase delete nos da el id
    if (e.target.classList.contains('delete')) {
      const ui = new UI();
      ui.deleteBook(e.target.getAttribute('_id'));
      ui.renderMessage('Book Removed', 'danger', 3000);
    }
    e.preventDefault();
  });

