//Es una clase que contendrá metodos para reutilizar
class BookService {
  constructor() {
    this.URI = '/api/books';
  }

  async getBooks() {
    const response = await fetch(this.URI);
    const books = await response.json();
    return books;
  }
  
  async postBook(book) {
    //Colocacion de cabeceras (informacion extra para decirle al back que le esta enviando)
    const response = await fetch(this.URI, { 
      method: 'POST',
      body: book
    });
    const data = await response.json();
  }

  async deleteBook(bookId) {
    //Consulta al backend
    const response = await fetch(`${this.URI}/${bookId}`, {
      //Enviamos el tipo de datos (en el method post, no se agrega headers porque se enviará una img)
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',

    });
    const data = await response.json();
  }
}

export default BookService;