import { format } from 'timeago.js';
import BookServices from "./services/BookServices";
const bookServices = new BookServices()


class UI {

    async renderBooks() {
        const books = await bookServices.getBooks();
        const cardContainer = document.getElementById('books-cards');
        cardContainer.innerHTML = ''

        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src=${book.imagePath}" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-block p-2">
                                <h3 class="card-title">${book.title}</h3>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">Delete</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;

            cardContainer.appendChild(div);
        })

    }

    async addNewBook(book) {
        await bookServices.postBook(book)
        this.clearForm();
        this.renderBooks();
    }

    clearForm() {
        document.getElementById('book-form').reset()
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        // creo el div con un mensaje
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`
        div.appendChild(document.createTextNode(message))
        
        // selecciono donde mostrar el mensaje
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div, bookForm);

        // remuevo el mensaje despues de un tiempo
        setTimeout(() => {
            document.querySelector('.message').remove()
        }, secondsToRemove)
    }

    async deleteBook(bookID) {
        await bookServices.deleteBook(bookID)
        this.renderBooks();
    }

}


export default UI;